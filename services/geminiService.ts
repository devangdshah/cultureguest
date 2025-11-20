import { GoogleGenAI, Type } from "@google/genai";

// Initialize the AI client
// Note: In a real production app, you might proxy this through a backend to hide the key,
// but for this frontend-only demo, we use the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCulturalInsight = async (eventType: string, location: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain the cultural significance of a "${eventType}" in "${location}" to a foreign guest. 
      Keep it concise (max 150 words), engaging, and focus on what a guest should expect (dress code, etiquette, food).`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Could not generate insight at this time.";
  } catch (error) {
    console.error("Error fetching cultural insight:", error);
    return "AI service is currently unavailable.";
  }
};

export const generateEventDescription = async (title: string, category: string, highlights: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write an inviting and warm description for a cultural event listing.
      Title: ${title}
      Category: ${category}
      Highlights: ${highlights}
      
      The tone should be welcoming to strangers who want to experience the culture. Keep it under 100 words.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating description:", error);
    return "";
  }
};

export const suggestEtiquette = async (eventType: string): Promise<{ title: string; tip: string }[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide 3 essential etiquette tips for a guest attending a ${eventType}. Return strictly valid JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              tip: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error suggesting etiquette:", error);
    return [];
  }
};
