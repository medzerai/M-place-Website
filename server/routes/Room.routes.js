import {
  addRoom,
  getAllRooms,
  getMyRooms,
} from "../controllers/Room.controller.js";

import express from "express";
const roomRouter = express.Router();

roomRouter.post("/room", addRoom).get("/room", getAllRooms);

roomRouter.get("/room/disc", getMyRooms);

export default roomRouter;
