import express from "express";
import handleAnalytics from "../controllers/analytics/analytics.js";

const router = express.Router();

router.get("/", handleAnalytics);

export default router;
