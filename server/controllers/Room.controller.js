import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Client from "../models/Client.model.js";
import PO from "../models/PO.model.js";
import Admin from "../models/Admin.model.js";

import Room from "../models/Room.model.js";
import Message from "../models/Message.model.js";

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
const getUser = async (id) => {
  let type = 0;
  let u = await Client.findById(id);
  if (u) {
    console.log(u);
    let user = {
      name: u.firstname + " " + u.lastname,
      img: u.profile_img,
    };
    type = 0;
    return { TypeUser: type, user: user };
  } else {
    u = await PO.findById(id);
    if (u) {
      let user = {
        name: u.company_name,
        img: u.logo_url,
      };
      type = 1;
      return { TypeUser: type, user: user };
    } else {
      u = await Admin.findById(id);
      let user = {
        name: "ADMIN",
        img: "http://www.aldiwanonline.com/turkish/wp-content/uploads/avatars/1/361c53f3af227096b4d9ed895085f5dd-bpfull.jpg",
      };
      type = 2;
      return { TypeUser: type, user: user };
    }
  }
};

// Add a new Room
const addRoom = async (req, res) => {
  const { User1Id, User2Id } = req.body;

  const User1 = await getUser(User1Id);
  const User2 = await getUser(User2Id);

  if (!User1.user || !User2.user) {
    throw new BadRequestError("there is a problem in the sender/receiver ID");
  } else {
    const existRoom = await Room.find({
      $or: [
        { User1Id: User1Id, User2Id: User2Id },
        { User1Id: User2Id, User2Id: User1Id },
      ],
    });
    if (existRoom.length > 0) {
      throw new BadRequestError("Room Already exist");
    }
    const room = new Room({
      User1Id,
      User2Id,
    });
    Room.create(room)
      .then((room) => {
        res.status(StatusCodes.OK).json("Room created successfully");
      })
      .catch((err) => {
        throw new BadRequestError(err);
      });
  }
};

// Get all Rooms
const getAllRooms = async (req, res) => {
  Room.find({})
    .sort({ createdAt: -1 })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("No Mesasges to show")
        : res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getDisc = async (val, id) => {
  let user;
  let tab = [];

  for (let x of val) {
    if (x.User1Id == id) {
      const user = await getUser(x.User2Id);
      const message = await Message.find({ roomId: x._id })
        .sort({ createdAt: -1 })
        .limit(1);
      tab.push({ id: x._id, user: user, message: message[0] });
    } else {
      const user = await getUser(x.User1Id);
      const message = await Message.find({ roomId: x._id })
        .sort({ createdAt: -1 })
        .limit(1);
      tab.push({ id: x._id, user: user, message: message[0] || "" });
    }
  }
  return tab;
};

const getIdFromToken = (tok) => {
  if (tok.PO) return tok.PO;
  else if (tok.Client) return tok.Client;
  else return tok.Admin;
};
//Get my last discussions

const getMyRooms = async (req, res) => {
  let authHeader = req.headers.authorization;
  authHeader = authHeader || authHeader.startsWith("Bearer");
  const token = authHeader.split(" ")[1];
  const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
  const idd = getIdFromToken(payload);
  const Userid = mongoose.Types.ObjectId(idd);

  Room.find({ $or: [{ User1Id: Userid }, { User2Id: Userid }] })
    .sort({ createdAt: -1 })
    .then(async (val) => {
      if (val.length == 0) {
        res.status(StatusCodes.OK).json("No Rooms to show");
      } else {
        const tab = await getDisc(val, idd);
        res.status(StatusCodes.OK).json(tab);
      }
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export { addRoom, getAllRooms, getMyRooms };
