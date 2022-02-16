import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please provide the User id"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    productSKU: {
      type: String,
      required: [true, "Please provide the Product SKU"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    marque: {
      type: String,
      required: [true, "Please provide your Product brand"],
      minlength: 3,
      maxlength: 20,
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
