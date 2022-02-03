import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your Category name"],
      minlength: 2,
      maxlength: 20,
      trim: true,
    },
    parent: {
      type: String,
      minlength: 1,
      default: "/",
      trim: true,
    },
    category: {
      type: String,
      minlength: 3,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
