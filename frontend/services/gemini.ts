import { GoogleGenAI, Chat } from '@google/genai';

// Declare process to avoid TS errors in environments where it's not globally typed
declare var process: { env: { API_KEY: string } };

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initChat = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
  }
  
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a knowledgeable, professional, and trustworthy financial assistant for 'Apex Financial Services'.
Your primary role is to educate users about different types of investment accounts (e.g., Traditional IRA, Roth IRA, 401(k), Brokerage accounts, 529 plans, High-Yield Savings, CDs).
- Provide clear, concise, and accurate information.
- Use formatting (bullet points, bold text) to make complex information easy to read.
- If asked about topics outside of financial accounts or basic investing principles, politely steer the conversation back to your area of expertise.
- Maintain a professional, reassuring, and helpful tone.
- Do not provide specific stock recommendations or personalized financial advice.`,
        temperature: 0.2, // Lower temperature for more factual and consistent responses
      }
    });
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initChat();
  }
  
  try {
    const response = await chatSession!.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error in Gemini service:", error);
    throw new Error("Failed to get a response from the assistant.");
  }
};
