import fs from 'fs/promises';
import path from 'path';
import { deleteChunks } from '../db/db.js';
import { getEmbeddingModal } from '../utlis/langchainTools.js';

const uploadFile = async (file) => {
    try {
        if (!file) {
            throw new ApiError(400, "No file uploaded");
        }

        // creating response with file information
        const fileDetails = {
            fileName: file.filename,
            originalName: file.originalname,
            filePath: file.path,
            fileSize: file.size,
            mimeType: file.mimetype,
            uploadedAt: new Date()
        };



        return fileDetails;
    } catch (error) {
        throw new Error(`Error in file upload service: ${error.message}`);
    }
};


const deleteFile = async (fileName) => {
    try {
        const filePath = 'uploads/' + fileName;

        // Check if file exists
        await fs.access(filePath);

        // Delete file
        await fs.unlink(filePath);

        // Delete the chunks
        const embedding = await getEmbeddingModal();
        await deleteChunks(filePath, embedding);

        return { success: true, message: "File deleted successfully" };
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error("File not found");
        }
        throw new Error(`Error in file deletion service: ${error.message}`);
    }
};


const getFile = async (fileName)=>{
    try{
        const filePath = path.join(path.resolve('./uploads'), fileName);
        await fs.access(filePath);
        return filePath;
    }catch(error){
        if (error.code === 'ENOENT') {
            throw new Error("File not found");
        }
        throw new Error(`Error retriving file: ${error.message}`);
    }
}

export {
    uploadFile,
    deleteFile,
    getFile
};
