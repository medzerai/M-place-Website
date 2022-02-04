import User from "../models/User.model.js";
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

const register = async (req, res) => {
  const { name, email, password, numTel } = req.body;

  if (!name || !email || !password || !numTel) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email } || { numTel });
  if (userAlreadyExists) {
    throw new BadRequestError("User already exists");
  }

  const user = await User.create({ name, email, password, numTel });
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const login = async (req, res) => {
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
