'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openAi";


interface FileUploadResponse {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}

export async function generatePdfSummary(
  uploadResponse: FileUploadResponse[]
) {
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
        }
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
                
            }

            if(!summary) {
                return {
                    success: false,
                    message: 'Failed to generate summary',
                    data: null,
                }
            }

        } catch (error) {
            console.log('Error fetching or extracting PDF text:', error);
            
            return {
                success: false,
                message: 'File upload failed',
                data: null,
              }
        }
}
