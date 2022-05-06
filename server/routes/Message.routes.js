import {
  addMessage,
  getAllRoomMessages,
  getMyDisc,
} from "../controllers/Message.controller.js";

import express from "express";
const messageRouter = express.Router();

messageRouter.post("/AddChat", addMessage);
messageRouter.get("/Chat", getAllRoomMessages);
messageRouter.get("/Chat/disc", getMyDisc);

export default messageRouter;
