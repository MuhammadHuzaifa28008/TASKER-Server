import openai from "../openai.js";
import chooseModel from "./chooseModel.js";
import axios from "axios";

export const getResponse = async (prompt, prevMessages) => {
  //   const model = await chooseModel("gpt-4-1106-preview", "gpt-4");
  try {
    // Call the promptOpenAI function with the model and prompt
    const response = await promptOpenAI(
      "gpt-4-1106-preview",
      prevMessages,
      prompt
    );

    // Return the response
    return response;
  } catch (error) {
    // Check if the error status is 429 (too many requests)
    if (error.status === 429) {
      // Try again with the gpt-4 model
      const response = await promptOpenAI("gpt-4", prompt, prevMessages);

      // Return the response
      return response;
    } else {
      // Set the error code to 402 and the error message to the original error message
      error.code = 402;
      error.message = error.message;

      // Throw the error
      throw error;
    }
  }
};

const promptOpenAI = async (model, prevMessages, prompt) => {
  // Create a request object with the model, prompt, and other parameters
  // console.log("here i became");
  const request = {
    model: model,
    messages: [
      {
        role: "system",
        content:
          "Develop chracter of a student-centric ChatBot within 'TASKER,' an educational application, leveraging the advanced capabilities of 'GPT-4 Turbo' LLM from OPENAI. Ensure the ChatBot exhibits a friendly demeanor while efficiently addressing student queries. Encourage user engagement by posing insightful questions in a discursive manner, guiding students to self-solve their inquiries. Prioritize clarity and straightforward communication to ensure a seamless understanding of information. The primary goal is to empower students by providing comprehensive assistance, emphasizing the importance of understanding key concepts before addressing specific queries.",
        // content: prompt,
      },
      // ...prevMessages,
      { role: "user", content: prompt },
    ],
    temperature: 0.005,
    max_tokens: 4096,
  };

  // Use the openai npm library to create a completion using the request object
  const completion = await openai.chat.completions.create(request);
  const response = completion.choices[0].message.content;
  console.log(response);

  // Return the response
  return response;
};
