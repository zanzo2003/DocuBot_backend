import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { getGenericAiChatPrompt } from "./systemPrompt.js";
import { OpenAI } from "openai/client.js";

const openai = new OpenAI({
  apiKey: process.env.GOOGLE_API_KEY,
  baseURL: process.env.GENAI_BASE_URI,
});


async function getEmbeddingModal() {

    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "embedding-001"
    });
    return embeddings;
}



async function readFileAndLoadChunks(filePath) {

    try {
        const loader = new PDFLoader(filePath);
        const documents = loader.load();
        return documents;

    } catch (error) {
        throw new Error(`Error creating chunks : `, error);
    }

}



async function callAI(context, userQuery) {

    const SYSTEM_PROMPT = await getGenericAiChatPrompt(context);



    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        response_format: { type: "text" },
        reasoning_effort: "medium",
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            {
                role: "user",
                content: userQuery,
            },
        ],
    });

    return response.choices[0].message.content;
}

export { getEmbeddingModal, readFileAndLoadChunks, callAI };