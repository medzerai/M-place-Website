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
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastname: user.lastname,
      location: user.location,
      name: user.name,
      numTel: user.numTel,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }
  console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location, numTel } = req.body;
  if (!email || !name || !lastName || !location || !numTel) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  user.numTel = numTel;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
