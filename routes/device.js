import express from "express";
import handleRegDevice from "../controllers/device/device.js";

const router = express.Router();

router.post("/reg", handleRegDevice);

export default router;
