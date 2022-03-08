import Admin from "../models/Admin.model.js";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.model.js";

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

// Log in a Admin
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    throw new BadRequestError("Invalid Credentials");
  }
  console.log(admin);
  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }

  const access_token = generateAccessToken(admin._id);
  const refresh_token = jwt.sign(
    { Admin: admin._id },
    process.env.REFRESH_TOKEN
  );
  const refreshtoken = new RefreshToken({
    token: refresh_token,
  });
  const savedToken = await refreshtoken.save();
  console.log("refresh_token", savedToken.token);
  console.log("access_token", access_token);
  console.log("logged in");
  res
    .header("Authorization", access_token)
    .json({ access_token: access_token, refresh_token: savedToken.token });
};

function generateAccessToken(id) {
  return jwt.sign({ Admin: id }, process.env.ACCESS_TOKEN, {
    expiresIn: "60s",
  });
}

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  const savedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!savedToken) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, admin) => {
    if (err) return res.sendStatus(403);
    const token = generateAccessToken({ id: admin._id });
    res.json({ accesToken: token });
  });
};

const logout = async (req, res) => {
  try {
    const ToBeRemovedToken = await RefreshToken.findOneAndDelete(
      req.body.token
    );
    console.log(ToBeRemovedToken);
    res.send("logged out!");
  } catch (err) {
    res.json({ message: err });
  }
};

const resetPassword = async (req, res) => {
  try {
    const verified = jwt.verify(req.params.token, process.env.ACCESS_TOKEN);
    if (!verified) return res.send("Acces denied");
    console.log(verified);
    if (!(req.body.password == req.body.confirmPassword))
      return res.send("please confirm with the right password");
    ///// Hash passwords/////
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(req.body.password, salt);

    console.log(hash);
    const admin = await Admin.findOneAndUpdate(
      { _id: req.params.adminId },
      {
        $set: {
          password: hash,
        },
      }
    );
    if (!admin) return res.send("Invalid Id...");
    console.log(admin);

    res.json(admin);
  } catch (err) {
    res.json({ message: err });
  }
};

export { register, login, logout, resetPassword, refreshToken };
