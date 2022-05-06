import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
    },
    products: {
      type: [String],
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default:false
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
