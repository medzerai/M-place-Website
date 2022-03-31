import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    User1Id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    User2Id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
