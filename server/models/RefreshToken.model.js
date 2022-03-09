import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model("RefreshToken", TokenSchema);
