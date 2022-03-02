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

//  Sign in a Client
const register = async (req, res) => {
  const { name, email, password, numTel } = req.body;

  if (!name || !email || !password || !numTel) {
    throw new BadRequestError("please provide all values");
  }

  const clientAlreadyExists = await Client.findOne({ email } || { numTel });
  if (clientAlreadyExists) {
    throw new NotFoundError("Client already exists");
  }

  const client = await Client.create({ name, email, password, numTel });
  const token = client.createJWT();
  res.status(StatusCodes.OK).json({
    client: {
      email: client.email,
      lastname: client.lastname,
      location: client.location,
      name: client.name,
      numTel: client.numTel,
      verified: client.verified,
    },
    token,
  });
};

// Log in a Client
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const client = await Client.findOne({ email }).select("+password");
  if (!client) {
    throw new BadRequestError("Invalid Credentials");
  }
  if (client.verified == false) {
    throw new BadRequestError(
      "Account not verified yet, Please check your mail !!"
    );
  }
  console.log(client);
  const isPasswordCorrect = await client.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }

  const token = client.createJWT();
  client.password = undefined;
  res.status(StatusCodes.OK).json({ client, token, location: client.location });
};

// Update a Client
const updateClient = async (req, res) => {
  // const { email, name, lastName, location, numTel, verified } = req.body;
  // if (!email || !name || !lastName || !location || !numTel) {
  //   throw new BadRequestError("Please provide all values");
  // }
  const client = await Client.findOne({ _id: req.client.clientId });

  client.email = req.body.email || client.email;
  client.name = req.body.name || client.name;
  client.lastName = req.body.lastName || client.lastName;
  client.location = req.body.location || client.location;
  client.numTel = req.body.numTel || client.numTel;
  client.verified = req.body.verified || client.verified;

  await client.save();
  const token = client.createJWT();
  res.status(StatusCodes.OK).json({ client, token, location: client.location });
};

export { register, login, updateClient };
