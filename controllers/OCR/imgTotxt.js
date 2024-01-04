import { createWorker } from "tesseract.js";
//import fs from "fs/promises"; // Using fs.promises for asynchronous file operations
// import Jimp from "jimp";

export default async function fetchTextFromImage(base64Data) {
  const worker = await createWorker();

  try {
    // const jimpImage = await Jimp.read(Buffer.from(base64Data, 'base64'));

    // // Determine the MIME type based on the image format
    // const mimeType = jimpImage.getMIME();

    // // Convert Jimp image to buffer
    // const processedBuffer = await jimpImage.getBufferAsync(mimeType);

    const processedBuffer = Buffer.from(base64Data, "base64");
    // Perform OCR on the processed buffer
    const {
      data: { text, confidence },
    } = await worker.recognize(processedBuffer);

    // console.log(process.memoryUsage());
    // console.log(`confidence: ${confidence}`);
    if (confidence < 10) {
      // console.log("No meaningful text was found");
      const error = new Error("No meaningful text was found in image!");
      error.code = 402;
      throw error;
    } else {
      // console.log(`Confidence: ${confidence}`);
      return text;
    }
  } catch (error) {
    // console.error("Error during OCR:", error.message);
    throw error;
  } finally {
    await worker.terminate();
  }
}
