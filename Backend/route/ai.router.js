import express from "express"
import JWTverify from "../middleware/JWTverify.js";
import { videoTitleDescription } from "../controller/ai.controller.js";

const router = express.Router();
router.use(express.json());



router.post("/video",JWTverify,videoTitleDescription);

export default router;