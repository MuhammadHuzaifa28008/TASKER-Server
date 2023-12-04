import Device from "../../models/devices.js";

const handleRegDevice = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide 'id' in the request body." });
    }

    const savedSuccessfully = await saveDeviceID(id);

    if (savedSuccessfully) {
      return res.status(200).json({ message: "Device ID saved successfully." });
    } else {
      throw new Error("Unable to save device ID.");
    }
  } catch (error) {
    console.error("Error handling device registration:", error);

    const statusCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";

    return res.status(statusCode).json({ error: errorMessage });
  }
};

const saveDeviceID = async (id) => {
  try {
    // Create a new device record
    await Device.create({ id });

    console.log(`Device ID ${id} saved successfully.`);
    return true;
  } catch (error) {
    return false;
  }
};

export default handleRegDevice;
