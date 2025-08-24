import { retrieveChunks } from "../db/db.js";
import { getEmbeddingModal, callAI  } from "../utlis/langchainTools.js";


const chatWithDocs = async (userQuery, fileName) => {
  if (!userQuery || !fileName) {
    throw new Error("userQuery and fileName are required");
  }

  const context = await retrieveChunks(`uploads/${fileName}`, await getEmbeddingModal(), 5, userQuery);
  return await callAI(context, userQuery);
  
};



export { chatWithDocs };