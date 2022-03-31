import { StatusCodes } from "http-status-codes";
import Client from "../models/Client.model.js";
import PO from "../models/PO.model.js";
import Admin from "../models/Admin.model.js";

import Product from "../models/Product.model.js";
import Rating from "../models/Rating.model.js";
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
  let u = await Client.findById(id);
  let type = 0;
  if (!u) {
    u = await PO.findById(id);
    type = 1;
    if (!u) {
      u = await Admin.findById(id);
      type = 2;
    }
  }
  return { TypeUser: type, user: u };
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
  let user, otherUser, ok;
  let tab = [];

  for (let x of val) {
    if (x.User1Id == id) {
      ok = true;
      const user = await getUser(x.User1Id);
      const otherUser = await getUser(x.User2Id);
      const message = await Message.find({ roomId: x._id })
        .sort({ createdAt: -1 })
        .limit(1);
      tab.push({ ok: ok, user: user, otherUser: otherUser, message });
    } else {
      const ok = false;
      const user = await getUser(x.User2Id);

      const otherUser = await getUser(x.User1Id);
      const message = await Message.find({ roomId: x._id })
        .sort({ createdAt: -1 })
        .limit(1);
      tab.push({ ok: ok, user: user, otherUser: otherUser, message });
    }
  }
  return tab;
};
//Get my last discussions

const getMyRooms = (req, res) => {
  Room.find({ $or: [{ User1Id: req.body.id }, { User2Id: req.body.id }] })
    .sort({ createdAt: -1 })
    .then(async (val) => {
      if (val.length == 0) {
        res.status(StatusCodes.OK).json("No Rooms to show");
      } else {
        const tab = await getDisc(val, req.body.id);
        res.status(StatusCodes.OK).json(tab);
      }
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export { addRoom, getAllRooms, getMyRooms };
