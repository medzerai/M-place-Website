import {
  addRoom,
  getAllRooms,
  getMyRooms,
} from "../controllers/Room.controller.js";

import express from "express";
const roomRouter = express.Router();

roomRouter.post("/room", addRoom);
roomRouter.get("/rooms", getAllRooms);
roomRouter.get("/myRooms", getMyRooms);

export default roomRouter;
