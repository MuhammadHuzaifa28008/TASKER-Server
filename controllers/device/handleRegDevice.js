import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    const registeredDevicesFilePath = path.join(
      __dirname,
      "./devices/devices.json"
    );
    let existingRegDevices = await readFile(registeredDevicesFilePath, "utf-8");
    existingRegDevices = existingRegDevices
      ? JSON.parse(existingRegDevices)
      : [];

    existingRegDevices.push(id);
    await writeFile(
      registeredDevicesFilePath,
      JSON.stringify(existingRegDevices, null, 2),
      "utf-8"
    );

    return true;
  } catch (error) {
    console.error("Error saving device ID:", error);

    const err = new Error("Unable to save device ID.");
    err.code = 500;
    throw err;
  }
};

export default handleRegDevice;
