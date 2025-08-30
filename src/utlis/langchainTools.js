import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { getEnhancementPrompt, getGenericAiChatPrompt } from "./systemPrompt.js";
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



    try {
        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            response_format: { type: "text" },
            reasoning_effort: "high",
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
    } catch (error) {
        console.log("Error calling AI : ", error);
        throw new Error(error.message);
    }
}

async function enhancePrompt( userQuery ){

    try {
        const SYSTEM_PROMPT = await getEnhancementPrompt();
    
        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            response_format: {type: "text"},
            reasoning_effort:"low",
            messages:[
                {
                    role: "system",
                    content:SYSTEM_PROMPT
                },
                { 
                    role: "assistant", 
                    content: "Understood. I will only provide the enhanced query text."  
                },
                {
                    role: "user",
                    content: `This is the user prompt :- \n ${userQuery}`
                }
            ]
        });
    
        return response.choices[0].message.content;
    } catch (error) {
        console.log("Error calling LLM for prompt enhancing : ", error);
        throw new Error(error.message)
    }
}

export { getEmbeddingModal, readFileAndLoadChunks, callAI, enhancePrompt };