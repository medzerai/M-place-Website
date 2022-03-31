import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    fromId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    roomId: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
