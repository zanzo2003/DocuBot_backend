import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

async function getEmbeddingModal(){

    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "embedding-001"
    });
    return embeddings;
}

async function readFileAndLoadChunks( filePath ){

    try{
        const loader = new PDFLoader(filePath);
        const documents = loader.load();
        return documents;

    }catch(error){
        throw new Error(`Error creating chunks : `, error);
    }

}