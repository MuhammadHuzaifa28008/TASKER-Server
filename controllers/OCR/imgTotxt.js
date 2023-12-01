import { createWorker } from "tesseract.js";
import fs from "fs/promises"; // Using fs.promises for asynchronous file operations

async function fetchTextFromImage(filePath) {
  const worker = await createWorker();

  try {
    // You may load language and other configurations if needed
    // await worker.load();
    // await worker.loadLanguage("eng");
    // await worker.initialize("eng");

    const {
      data: { text, words, confidence },
    } = await worker.recognize(filePath);
    if (confidence < 70) {
      console.log("no meaningful text was found");
      const error = new Error("No meaningful text was found in image!");
      error.code = 402;
      throw error;
    } else {
      console.log(confidence);
      return text;
    }
  } catch (error) {
    console.error("Error during OCR:", error.message);
    throw error; // Re-throw the error to handle it at a higher level if needed
  } finally {
    await worker.terminate();

    // Delete the processed file after OCR is complete
    try {
      await fs.unlink(filePath);
      console.log("Processed file deleted successfully");
    } catch (unlinkError) {
      console.error("Error deleting processed file:", unlinkError);
      // Handle the error or log it as needed
    }
  }
}

export default fetchTextFromImage;
