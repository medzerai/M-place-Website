import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
