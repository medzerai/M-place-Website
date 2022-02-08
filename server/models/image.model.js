import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
