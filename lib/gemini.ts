import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const model = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis
    and proper markdown formatting:\n\n${pdfText}`,
      config: {
        temperature: 0.1,
        maxOutputTokens: 1500,
      },
    });

    return model.text;

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};


