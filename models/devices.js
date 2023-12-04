import mongoose from "mongoose";

const devicesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
  },
  {
    collection: "devices",
  }
);

const Device = mongoose.model("Device", devicesSchema);
export default Device;
