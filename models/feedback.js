import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
    },
  },
  {
    collection: "feedbacks",
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
