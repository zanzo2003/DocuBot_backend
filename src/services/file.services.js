import fs from 'fs/promises';
import path from 'path';
import { ApiError } from '../utlis/ApiErrorResponse.js';
import { indexDocument } from '../db/db';


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
        throw new ApiError(500, `Error in file upload service: ${error.message}`);
    }
};


const deleteFile = async (fileName) => {
    try {
        const filePath = path.join('./uploads', fileName);

        // Check if file exists
        await fs.access(filePath);

        // Delete file
        await fs.unlink(filePath);

        return { success: true, message: "File deleted successfully" };
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new ApiError(404, "File not found");
        }
        throw new ApiError(500, `Error in file deletion service: ${error.message}`);
    }
};

export {
    uploadFile,
    deleteFile
};
