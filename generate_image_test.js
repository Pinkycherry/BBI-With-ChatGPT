import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: 'A storytelling, cinematic shot of a focused entrepreneur in a dimly lit, cozy home office. Realistic human skin textures, high-end photography, 16:9.',
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
        }
    });
    const base64Image = response.generatedImages[0].image.imageBytes;
    fs.writeFileSync('test_image.jpg', Buffer.from(base64Image, 'base64'));
    console.log("Image saved!");
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
