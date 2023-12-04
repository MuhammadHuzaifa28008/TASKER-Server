import Feedback from "../../models/feedback.js";

const handleFeedback = async (req, res) => {
  const { feedback } = req.body;
  try {
    if (!feedback) {
      return res.status(400).json({ message: "feedback missing" });
    } else {
      const saved = await saveFeedback(feedback);
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

const saveFeedback = async (feedback) => {
  try {
    // Assuming your Feedback model has a schema similar to the one in the saveDeviceID example
    // Create a new feedback record
    await Feedback.create({ feedback });

    console.log(`Feedback ${feedback} saved successfully.`);
    return true; // Indicate success
  } catch (error) {
    console.error("Error saving feedback:", error);
    return false; // Indicate failure
  }
};

export default handleFeedback;
