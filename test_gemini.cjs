const { GoogleGenAI } = require("@google/genai");

async function run() {
  const ai = new GoogleGenAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Respond with the word "Hello".'
    });
    console.log("Success:", response.text);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
run();
