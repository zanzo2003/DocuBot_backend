import { retrieveChunks } from "../db/db.js";
import { getEmbeddingModal, callAI, enhancePrompt  } from "../utlis/langchainTools.js";


const chatWithDocs = async (userQuery, fileName) => {
  if (!userQuery || !fileName) {
    throw new Error("user query and fileName are required");
  }
 try {
   const enhancedUserQuery = await enhanceUserQueryWrapper(userQuery);
   console.log("Enhanced Prompt : - ", enhancedUserQuery);
   const context = await retrieveChunks(`uploads/${fileName}`, await getEmbeddingModal(), 5, enhancedUserQuery);
   return await callAI(context, enhancedUserQuery);
 } catch (error) {
  console.log("Error while generating response : ", error);
  throw new Error(error.message);
 }
  
};

const enhanceUserQueryWrapper = async (userQuery)=>{

  if(!userQuery){
    throw new Error("user query is requerd");
  }

  try {
    const enhancedPrompt = await enhancePrompt(userQuery);
    return enhancedPrompt;
  } catch (error) {
    console.log("Error enchancing prompt : ", error);
    throw new Error(error.message);
  }
}



export { chatWithDocs };