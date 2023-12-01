import express from "express";
import handleRegDevice from "../controllers/device/handleRegDevice.js";

const router = express.Router();

router.post("/reg", handleRegDevice);

export default router;
