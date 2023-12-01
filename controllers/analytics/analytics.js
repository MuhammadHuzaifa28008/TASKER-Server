import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFile } from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const handleAnalytics = async (req, res) => {
  try {
    const devices = await getDevices();
    const feedbacks = await getFeedBacks();

    const response = {
      devices: {
        length: devices.length,
        data: devices,
      },
      feedbacks: {
        length: feedbacks.length,
        data: feedbacks,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error handling analytics:", error);

    const statusCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";

    res.status(statusCode).json({ error: errorMessage });
  }
};

const getDevices = async () => {
  try {
    const devicesFilePath = path.join(
      __dirname,
      "../device/devices/devices.json"
    );
    const devicesData = await readFile(devicesFilePath, "utf-8");

    if (!devicesData) {
      return [];
    }

    return JSON.parse(devicesData);
  } catch (error) {
    console.error("Error getting devices:", error);
    throw { code: 500, message: "Unable to fetch devices" };
  }
};

const getFeedBacks = async () => {
  try {
    const feedbacksFilePath = path.join(
      __dirname,
      "../feedback/feedbacks/feedbacks.json"
    );
    const feedbacksData = await readFile(feedbacksFilePath, "utf-8");

    if (!feedbacksData) {
      return [];
    }

    return JSON.parse(feedbacksData);
  } catch (error) {
    console.error("Error getting feedbacks:", error);
    throw { code: 500, message: "Unable to fetch feedbacks" };
  }
};

export default handleAnalytics;
