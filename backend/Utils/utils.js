import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"
dotenv.config()
const GEMINI_API = process.env.GEMINI_API_KEY
const genAI = new GoogleGenAI({ apiKey: GEMINI_API });
export const genAILeadsScore = async (aiMsg) => {
    try {
        const prompt = `
    Lead info:
    AI Message: ${aiMsg}

    Analyze the intent of lead according to message and score it out 10  and only return it.
  `;
        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        });
        return result.text

    } catch (err) {
        return  err

    }
}