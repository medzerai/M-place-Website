import mongoose from "mongoose";

const FilterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your Filter name"],
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    Variable_list: [{ type: mongoose.Types.ObjectId, ref: "Variable" }],
    quantity: {
      type: Number,
      required: [true, "Please provide your Quantity"],
    },
    price: {
      type: Number,
      required: [true, "Please provide your Price"],
    },
    Product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

export default mongoose.model("Filter", FilterSchema);
