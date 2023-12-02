import { getResponse } from "../OPENAI/apiCalls/getResponse.js";

const handleTextPrompt = async (req, res) => {
  try {
    // Check if required data is present in the request body
    if (!req.body || !req.body.prompt) {
      const errorMessage = "Missing prompt in the request body";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Extract data from the request body
    const { prompt, prevMessages: prevMessagesFromClient } = req.body;

    // Ensure prevMessages is an array
    const prevMessages = Array.isArray(prevMessagesFromClient) ? prevMessagesFromClient : [];
    console.log("Prev Messages:", prevMessages);

    // Call the external function to get the response
    const response = await getResponse(prompt, prevMessages);

    // Send a successful response
    return res.status(200).json({ aiResponse: response });
  } catch (error) {
    console.error("Error:", error.message);

    // Handle the error gracefully
    const statusCode = error.code && error.code >= 400 && error.code < 500 ? error.code : 500;
    const errorMessage = statusCode === 500 ? "Internal Server Error" : error.message;

    return res.status(statusCode).json({ error: errorMessage });
  }
};

export default handleTextPrompt;
