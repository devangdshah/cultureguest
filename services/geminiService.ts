import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the AI client
// Note: In a real production app, you might proxy this through a backend to hide the key,
// but for this frontend-only demo, we use the environment variable directly.
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

export const getCulturalInsight = async (eventType: string, location: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const prompt = `Explain the cultural significance of a "${eventType}" in "${location}" to a foreign guest. 
      Keep it concise (max 150 words), engaging, and focus on what a guest should expect (dress code, etiquette, food).`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Could not generate insight at this time.";
  } catch (error) {
    console.error("Error fetching cultural insight:", error);
    return "AI service is currently unavailable.";
  }
};

export const generateEventDescription = async (title: string, category: string, highlights: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const prompt = `Write an inviting and warm description for a cultural event listing.
      Title: ${title}
      Category: ${category}
      Highlights: ${highlights}
      
      The tone should be welcoming to strangers who want to experience the culture. Keep it under 100 words.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "";
  } catch (error) {
    console.error("Error generating description:", error);
    return "";
  }
};

export const suggestEtiquette = async (eventType: string): Promise<{ title: string; tip: string }[]> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    
    const prompt = `Provide 3 essential etiquette tips for a guest attending a ${eventType}. Return strictly valid JSON in this format:
    [
      {"title": "Tip 1 title", "tip": "Tip 1 description"},
      {"title": "Tip 2 title", "tip": "Tip 2 description"},
      {"title": "Tip 3 title", "tip": "Tip 3 description"}
    ]`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error suggesting etiquette:", error);
    return [];
  }
};
