import {
  checkoutSession,
  getAllOrders,
  getOrderById,
} from "../controllers/Payment.controller.js";
import express from "express";
const PaymentRouter = express.Router();

PaymentRouter.post("/Pay", checkoutSession);
PaymentRouter.get("/Orders", getAllOrders);
PaymentRouter.get("/Orders/:id", getOrderById);

export default PaymentRouter;
