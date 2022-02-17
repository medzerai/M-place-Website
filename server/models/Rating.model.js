import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please provide the User id"],
      trim: true,
    },
    productSKU: {
      type: String,
      required: [true, "Please provide the Product SKU"],
      trim: true,
    },
    rate: {
      type: Number,
      required: [true, "Please provide the product rating score"],
      max: 5,
      min: 0,
    },
    comment: {
      type: String,
      required: [true, "Please provide your rating comment"],
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", RatingSchema);
