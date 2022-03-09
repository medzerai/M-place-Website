import Client from "../models/Client.model.js";
import { StatusCodes } from "http-status-codes";

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

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

// Update a Client
const updateClient = async (req, res) => {
  const client = await Client.findOne({ _id: req.client.clientId });

  client.email = req.body.email || client.email;
  client.name = req.body.name || client.name;
  client.lastName = req.body.lastName || client.lastName;
  client.location = req.body.location || client.location;
  client.numTel = req.body.numTel || client.numTel;
  client.verified = req.body.verified || client.verified;

  await client.save();
  //   const token = client.createJWT();
  res.status(StatusCodes.OK).json({ client });
};

// get all clients

const getAllClient = (req, res) => {
  Client.find()
    .then((val) => {
      res.status(200).json(val);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get verified clients
const getVerifiedClients = (req, res) => {
  Client.find({ verified: true })
    .then((val) => {
      res.status(200).json(val);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getNoneVerifiedClients = (req, res) => {
  Client.find({ verified: false })
    .then((val) => {
      res.status(200).json(val);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export {
  updateClient,
  deleteClient,
  getAllClient,
  getVerifiedClients,
  getNoneVerifiedClients,
};
