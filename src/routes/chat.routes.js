import {Router} from "express";
import { chatController } from "../controllers/chat.controller.js";


const router = Router();



// send query
router.route("/prompt").post(chatController);

export default router;