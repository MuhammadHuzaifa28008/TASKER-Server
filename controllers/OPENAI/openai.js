import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.openaiApiKey,
  organization: "org-fTBZ4paSS2qqYFEEUOVJf3K1",
});

export default openai;
