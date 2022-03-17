import mongoose from "mongoose";

const RdvSchema = new mongoose.Schema(
  {
    for_PO: {
      type: String,
      required: [true, "Please provide your product owner id"],
      trim: true,
    },

    date: {
      type: Date,
      required: [true, "Please provide your Rendez-vous date"],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rdv", RdvSchema);
