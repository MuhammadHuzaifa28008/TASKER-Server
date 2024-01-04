import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const versionFilePath = path.join(__dirname, "version.json");

const saveVersionToJSON = async (version) => {
  try {
    const data = JSON.stringify({ version });
    await writeFile(versionFilePath, data, "utf-8");
    console.log(`Version ${version} updated successfully.`);
    return true;
  } catch (error) {
    console.error("Error saving version:", error);
    return false;
  }
};

const getVersionFromJSON = async () => {
  try {
    const data = await readFile(versionFilePath, "utf-8");
    const { version } = JSON.parse(data);
    // console.log(version);
    return version;
  } catch (error) {
    console.error("Error getting version:", error);
    return null;
  }
};

const handlePostVersion = async (req, res) => {
  if (!req.body.version)
    return res.status(400).json({ message: "Please provide version" });

  try {
    const versionSaved = await saveVersionToJSON(req.body.version);

    if (versionSaved) {
      return res.status(200).json({ message: "Version updated successfully" });
    } else {
      return res.status(500).json({ message: "Failed to update version" });
    }
  } catch (error) {
    console.error("Error handling post update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetVersion = async (req, res) => {
  try {
    const version = await getVersionFromJSON();
    if (version) return res.status(200).JSON({ version: version });

    // else return res.status(404).json({ message: "Version not found" });
  } catch (error) {
    console.error("Error handling get version:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { handlePostVersion, handleGetVersion };
