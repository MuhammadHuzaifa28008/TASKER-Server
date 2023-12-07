import express from "express";
import {
  handlePostVersion,
  handleGetVersion,
} from "../controllers/version/version.js";
const router = express.Router();

router.post("/", handlePostVersion);
router.get("/", handleGetVersion);

export default router;
