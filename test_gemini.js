const { GoogleGenAI } = require("@google/genai");

async function main() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: "Say hello",
    });
    console.log(response.text);
  } catch (error) {
    console.error("Error:", error);
  }
}
main();
