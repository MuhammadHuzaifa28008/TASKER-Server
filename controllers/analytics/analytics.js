import Device from "../../models/devices.js";
import Feedback from "../../models/feedback.js";

const handleAnalytics = async (req, res) => {
  try {
    const devices = await getDevices();
    const feedbacks = await getFeedbacks();

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
    // Fetch all devices from the Device collection
    const devices = await Device.find({}).select("id");

    // If no devices are found, return an empty array
    return devices || [];
  } catch (error) {
    console.error("Error getting devices:", error);
    throw { code: 500, message: "Unable to fetch devices" };
  }
};

const getFeedbacks = async () => {
  try {
    // Fetch all feedbacks from the Feedback collection
    const feedbacks = await Feedback.find({}).select("feedback");

    // If no feedbacks are found, return an empty array
    return feedbacks || [];
  } catch (error) {
    console.error("Error getting feedbacks:", error);
    throw { code: 500, message: "Unable to fetch feedbacks" };
  }
};

export default handleAnalytics;
