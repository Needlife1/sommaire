'use server';

import { getDbConnection } from '@/lib/db';
import { generateSummaryFromGemini } from '@/lib/gemini';
import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromOpenAI } from '@/lib/openAi';
import { formatFileNameAsTitle } from '@/utils/formatUtils';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

interface FileUploadResponse {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(uploadResponse: FileUploadResponse[]) {
  if (!uploadResponse) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log(pdfText);
    let summary;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);

      if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.error(
            'Gemini API failed after OpenAI quote exceeded',
            geminiError
          );
          throw new Error(
            'Failed to generate summery with available AI providers'
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: 'Failed to generate summary',
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: 'Summary generated successfully',
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (error) {
    console.log('Error processing PDF:', error);

    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }
}

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
  ) VALUES (
   ${userId},
   ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
  );`;
  } catch (error) {
    console.error('Error saving PDF summary', error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  let savedSummary;
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: 'Failed to save PDF summary, please try again...',
      };
    }

    
  } catch (error) {
    console.log('Error processing PDF:', error);

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error saving summary',
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: 'PDF summary saved successfully',
    data: {
      id: savedSummary.id,
    }
  };
}
