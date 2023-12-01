import express from "express";
const router = express.Router();
import handleTextPrompt from "../controllers/default/text.js";
import handleImgPrompt from "../controllers/default/img.js";

router.post("/text", handleTextPrompt);
router.post("/img", handleImgPrompt);



export default router;