import User from "../models/User.model.js";
import { StatusCodes } from "http-status-codes";

module.exports.register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ user });
};

module.exports.login = async (req, res) => {
  res.send("login user");
};

module.exports.updateUser = async (req, res) => {
  res.send("update user");
};
