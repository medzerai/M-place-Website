import mongoose from "mongoose";

const FilterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your Filter name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    variableIds: {
      type: [String],
      required: [true, "Please provide your Variable Id"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide your Quantity"],
    },
    price: {
      type: Number,
      required: [true, "Please provide your Price"],
    },
    Product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
    Variable_list: [{ type: mongoose.Types.ObjectId, ref: "Variable" }],
  },
  { timestamps: true }
);

export default mongoose.model("Filter", FilterSchema);
