import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateContent({
        model: 'imagen-3.0-generate-002',
        contents: 'A storytelling, cinematic shot of a focused entrepreneur in a dimly lit, cozy home office. Realistic human skin textures, high-end photography, 16:9.',
    });
    console.log(response);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
