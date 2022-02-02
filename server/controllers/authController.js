import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const register = async (req, res) => {
  const { name, email, password, numTel } = req.body;

  if (!name || !email || !password || !numTel) {
    throw new CustomAPIError("please provide all values");
  }

  const user = await User.create({ name, email, password, numTel });
  res.status(StatusCodes.OK).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
