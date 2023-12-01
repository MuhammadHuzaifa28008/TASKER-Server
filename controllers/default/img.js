import { fileURLToPath } from "url";
import { dirname } from "path";
import { validationResult } from "express-validator";
import fetchTextFromImage from "../OCR/imgTotxt.js";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const handleImgPrompt = async (req, res) => {
  try {
    const { encodedStr } = req.body;

    // Perform additional validation for image type if needed
    if (!isImage(encodedStr)) {
      const error = new Error("it is not base 64");
      error.code = 401;
      throw error;
    }

    // Generate a unique filename
    const fileName = generateFileName();

    // Save the image to the 'imgs' folder
    const imagePath = path.join(__dirname, "../OCR/imgs/", fileName);
    saveImage(encodedStr, imagePath);

    // Pass the file path to fetchTextFromImage
    const fetchedTxt = await fetchTextFromImage(imagePath);

    // Respond with the fetched text and a success message
    return res
      .status(200)
      .json({ fetchedTxt, message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error handling image to text controller:", error.message);
    if (error.code >= 400 && error.code < 500) {
      return res.status(400).json({ code: error.code, message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Helper function to check if the base64 data represents an image
const isImage = (base64String) => {
  // You may implement additional checks here based on your needs
  return base64String.startsWith("data:image/");
};

// Helper function to generate a unique filename
const generateFileName = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}_${randomString}.png`;
};

// Helper function to save the base64-encoded image to a file
const saveImage = (base64String, filePath) => {
  const imageBuffer = Buffer.from(
    base64String.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  fs.writeFileSync(filePath, imageBuffer);
};

export default handleImgPrompt;
