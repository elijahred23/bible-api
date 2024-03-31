import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiApiKey } from "./apiKey.js";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(geminiApiKey);

async function generateGeminiResponse(msg) {
    // Access the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Start the chat with initial conversation history
    const chat = model.startChat({
        history: [
        ],
        generationConfig: {
            maxOutputTokens: 2000,
        },
    });

    // Send the message and await the response
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    // Return the generated text
    return text;
}

export { generateGeminiResponse };