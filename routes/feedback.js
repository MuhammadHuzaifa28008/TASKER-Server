import express from "express";
import handleFeedback from "../controllers/feedback/feedback.js";

const router = express.Router();

router.post("/", handleFeedback);

export default router;
