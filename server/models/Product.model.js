import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your Product name"],
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    SKU: {
      type: String,
      required: [true, "Please provide your Product SKU"],
      minlength: 3,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    marque: {
      type: String,
      required: [true, "Please provide your Product brand"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide your Product description"],
      minlength: 10,
    },
    short_description: {
      type: String,
      required: [true, "Please provide your Product short description"],
      minlength: 10,
    },
    product_imgs: {
      type: [String],
      minlength: 5,
      default: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    reduction_percentage: {
      type: Number,
      max: 100,
      min: 0,
      default: 0,
    },

    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide your category id"],
      trim: true,
      default: "/",
    },
    Filter_list: [{ type: mongoose.Types.ObjectId, ref: "Filter" }],
    PostedBy: {
      type: mongoose.Types.ObjectId,
      ref: "PO",
      required: [true, "Please provide your id"],
      trim: true,
      default: "",
    },
    visibility: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
