import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile, deleteFile } from "../services/file.services.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { ApiError } from "../utlis/ApiErrorResponse.js";

const router = Router();

// upload file
router.route("/file").post(upload, async (req, res) => {
    try {
        const fileDetails = await uploadFile(req.file);
        res.status(201).json(
            new ApiResponse(201, fileDetails, "File uploaded successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

// delete file
router.route("/file/:fileName").delete(async (req, res) => {
    try {
        const result = await deleteFile(req.params.fileName);
        res.status(200).json(
            new ApiResponse(200, result, "File deleted successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});


