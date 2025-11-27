import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
    console.warn("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable.");
}

export const ai = new GoogleGenAI({ apiKey });
