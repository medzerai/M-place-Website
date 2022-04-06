import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import Client from "../models/Client.model.js";
import PO from "../models/PO.model.js";
import Admin from "../models/Admin.model.js";

import Message from "../models/Message.model.js";
import Room from "../models/Room.model.js";

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
  if (!u) {
    u = await PO.findById(id);
    if (!u) {
      u = await Admin.findById(id);
    }
  }
  return u;
};

const getIdFromToken = (tok) => {
  if (tok.PO) return tok.PO;
  else if (tok.Client) return tok.Client;
  else return tok.Admin;
};
// Add a new Message
const addMessage = async (req, res) => {
  let authHeader = req.headers.authorization;
  authHeader = authHeader || authHeader.startsWith("Bearer");
  const token = authHeader.split(" ")[1];
  const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
  const idd = getIdFromToken(payload);
  const Userid = mongoose.Types.ObjectId(idd);
  const { content, roomId } = req.body;

  const fromUser = await getUser(idd);

  if (!fromUser) {
    throw new BadRequestError("there is a problem in the sender/receiver ID");
  } else {
    const mes = new Message({
      content,
      fromId,
      roomId,
    });
    Message.create(mes)
      .then((val) => {
        res.status(StatusCodes.OK).json("Message sent successfully");
      })
      .catch((err) => {
        throw new BadRequestError(err);
      });
  }
};

const getTrueFalseMesages = async (val) => {
  const room = await Room.findById(val[0].roomId);
  let tab = [];
  let a;
  for (let x of val) {
    if (x.fromId.equals(room.User1Id)) {
      a = {
        _id: x._id,
        content: x.content,
        fromId: x.fromId,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        __v: x.__v,
        roomId: x.roomId,
        isUser1: true,
      };
    } else {
      a = {
        _id: x._id,
        content: x.content,
        fromId: x.fromId,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        __v: x.__v,
        roomId: x.roomId,
        isUser1: false,
      };
    }
    tab.push(a);
  }
  return tab;
};

// Get all Messages
const getAllRoomMessages = async (req, res) => {
  Message.find({ roomId: req.body.roomId })
    .sort({ createdAt: -1 })
    .then(async (val) => {
      if (val.length == 0) {
        res.status(StatusCodes.OK).json("No Mesasges to show");
      } else {
        const tab = await getTrueFalseMesages(val);
        res.status(StatusCodes.OK).json(tab);
      }
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

//Get my last discussions

const getMyDisc = (req, res) => {
  Message.find({ $or: [{ fromId: req.body.id }, { roomId: req.body.id }] })
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

export { addMessage, getAllRoomMessages, getMyDisc };
