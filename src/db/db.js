import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config";


async function indexDocument(chunks, embeddingModel){

    try {
        const vectorStore = await QdrantVectorStore.fromDocuments(
            chunks,
            embeddingModel,
            {
                url: process.env.DB_URI,
                collectionName: process.env.COLLECTION_NAME
            }
        );
        return !!vectorStore;
    } catch (error) {
        throw new Error(`Error indexing document: ${error.message}`);
    }
}


async function retrieveChunks(filePath, embeddings, noOfRelaventChunks , userQuery){

    const filter = {
        must: [{ key: "metadata.source", match: { value: filePath } }]
    }

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: process.env.DB_URI,
            collectionName: process.env.COLLECTION_NAME
        }
    )

    const vectorSearch = vectorStore.asRetriever({
        filter: filter,
        k: noOfRelaventChunks
    })

    const result = await vectorSearch.invoke(userQuery);

    return result;
}



async function deleteChunks(filePath, embeddings){

    const filter = {
        must: [{ key: "metadata.source", match: { value: filePath } }]
    }

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: process.env.DB_URI,
            collectionName: process.env.COLLECTION_NAME
        }
    )


    const deletedChunks = vectorStore.delete({
        filter: filter
    })

    return deletedChunks;
    
}




export {retrieveChunks, indexDocument, deleteChunks};