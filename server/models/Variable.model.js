import mongoose from "mongoose";

const VariableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your Variable name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    option: {
      type: String,
      required: [true, "Please provide your Variable option"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Variable", VariableSchema);
