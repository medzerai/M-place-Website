import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const { name, email, password, numTel } = req.body;

  if (!name || !email || !password || numTel) {
    throw new Error("please provide all values");
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
