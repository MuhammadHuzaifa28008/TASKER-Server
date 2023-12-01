import { writeFile, readFile } from "fs/promises"; // Use fs.promises for Promise-based file operations
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const handleFeedback = async (req, res) => {
  const { feedback } = req.body;
  try {
    if (!feedback) {
      return res.status(400).json({ message: "feedback missing" });
    } else {
      const saved = await saveFeedBack(feedback);
      if (saved) {
        return res.status(200).json({ message: "feedback saved successfully" });
      } else {
        const error = new Error("unable to save the feedback");
        error.code = 402;
        throw error;
      }
    }
  } catch (error) {
    res.status(500).json({ code: error.code, message: error.message });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const saveFeedBack = async (feedback) => {
  try {
    const feedbackFilePath = path.join(__dirname, "./feedbacks/feedbacks.json");

    // Read the existing feedbacks from the file
    let existingFeedbacks = await readFile(feedbackFilePath, "utf-8");

    // If the file is empty or null, initialize with an empty array
    existingFeedbacks = existingFeedbacks ? JSON.parse(existingFeedbacks) : [];

    // Add the new feedback to the array
    existingFeedbacks.push(feedback);

    // Write the updated feedback array back to the file
    await writeFile(
      feedbackFilePath,
      JSON.stringify(existingFeedbacks, null, 2),
      "utf-8"
    );

    return true; // Indicate success
  } catch (error) {
    console.error("Error saving feedback:", error);
    return false; // Indicate failure
  }
};

export default handleFeedback;
