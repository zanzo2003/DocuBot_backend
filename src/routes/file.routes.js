import {Router} from "express";



const router = Router();



// upload file
router.route("/file").post();


// delete file
router.route("/file/:id").delete();


