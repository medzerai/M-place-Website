import { checkoutSession } from "../controllers/Payment.controller.js";
import express from "express";
const PaymentRouter = express.Router();

PaymentRouter.post("/Pay", checkoutSession);
// PaymentRouter.get("/Chat", getAllRoomMessages);
// PaymentRouter.get("/Chat/disc", getMyDisc);

export default PaymentRouter;