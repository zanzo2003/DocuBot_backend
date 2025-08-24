import { uploadFile, deleteFile, getFile } from "../services/file.services.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import { indexDocument } from "../db/db.js";
import { getEmbeddingModal, readFileAndLoadChunks } from "../utlis/langchainTools.js";
import { ApiErrorResponse } from "../utlis/ApiErrorResponse.js";
import path from "path";




const fileUpload = asyncHandler( async(req, res)=>{

    try{
        const response = await uploadFile(req.file);
        const filePath = response.filePath;
        const embedding = await getEmbeddingModal();
        const chunks = await readFileAndLoadChunks(filePath)
        await indexDocument(chunks, embedding).then(()=>console.log('Indexing Completed for file at ', filePath)).catch( (error)=> new Error(error.message))

        res.status(201).json(
            new ApiResponse(201, response, "File uploaded successfully")
        );
    }catch( error ){
        throw new Error(error.message);
    }
});


const fileDelete = asyncHandler( async(req, res)=>{

    try{
        const fileName = req.params.fileName;
        const response = await deleteFile(fileName);
        res.status(200).json(
            new ApiResponse(200, response, response.message)
        );
    } catch( error ){
        throw new Error(error.message);
    }
});


const fileGet = asyncHandler( async(req, res)=>{
    try {
    const fileName = req.params.fileName;
    const filePath = await getFile(fileName);

    // detect content type from extension
    const ext = path.extname(fileName).toLowerCase();

    if (ext === ".pdf") {
      res.setHeader("Content-Type", "application/pdf");
    } else {
      res.setHeader("Content-Type", "application/octet-stream");
    }

    // stream file so browser can preview
    return res.sendFile(filePath);
  } catch (error) {
    return ApiResponse(error.status, ApiErrorResponse(error.status, error.message, error?.error || [], error.stack), error);
  }
})

export { fileUpload, fileDelete, fileGet};