// Importing modules using ECMAScript module syntax
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import errorMiddleware from "./middlewares/errorMiddleware.js";
import defaultRoutes from "./routes/default.js";
import feedbackRoutes from "./routes/feedback.js";
import deviceRoutes from "./routes/device.js";
import analyticsRoutes from "./routes/analytics.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(helmet());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "server at your service" });
});
app.use("/default", defaultRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/device", deviceRoutes);
app.use("/analytics", analyticsRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
