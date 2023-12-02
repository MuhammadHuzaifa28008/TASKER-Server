import { getResponse } from "../OPENAI/apiCalls/getResponse.js";

const handleTextPrompt = async (req, res) => {
  try {
    // console.log("1");
    if (
      !req.body ||
      !req.body.prompt ||
      !Array.isArray(req.body.prevMessages)
    ) {
      // console.log("err1");
      // If the required data is missing, throw a custom error
      const error = new Error("Missing prompt in the request body");
      error.code = 401;
      throw error;
    }

    // Your existing logic
    const prompt = req.body.prompt;
    const prevMessages = [];
    prevMessages.push(...prevMessages);
    const response = await getResponse(prompt, prevMessages);
    // console.log("2");
    // Send a successful response
    return res.status(200).json({ aiResponse: response });
  } catch (error) {
    console.log("err2");
    // Handle the error gracefully
    if (error.code >= 400 && error.code < 500) {
      return res.status(400).json({ code: error.code, message: error.message });
    } else {
      // Send an error response
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handleTextPrompt;
