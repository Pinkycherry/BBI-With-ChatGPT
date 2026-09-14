import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  // We can try gemini-2.0-flash since gemini-2.5-flash 503ed
  try {
    const res = await ai.models.generateContent({ model: "gemini-2.0-flash", contents: "Say hello!"});
    console.log("gemini-2.0-flash:", res.text);
  } catch(e) { console.error("gemini-2.0-flash error:", e.status); }
}
run();
