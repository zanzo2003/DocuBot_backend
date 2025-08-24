import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { fileUpload, fileDelete, fileGet } from "../controllers/file.controller.js";

const router = Router();

// upload file
router.route("/file").post(upload, fileUpload);



// get file by name
router.route("/file/:fileName").get(fileGet)

// delete file
router.route("/file/:fileName").delete(fileDelete);


export default router;