import Client from "../models/Client.model.js";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.model.js";
import verification from "../templates/validation.js";
import resetPasswordTempl from "../templates/resetPassword.js";
import bcrypt from "bcryptjs";

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
  const { firstname, lastname, email, password, numTel, profile_img } =
    req.body;

  if (!firstname || !lastname || !email || !password || !numTel) {
    throw new BadRequestError("please provide all values");
  }

  const clientAlreadyExists = await Client.findOne({ email } || { numTel });
  if (clientAlreadyExists) {
    throw new BadRequestError("Client already exists");
  }
  const newClient = new Client({
    firstname,
    lastname,
    email,
    password,
    numTel,
    profile_img,
  });

  const client = await Client.create(newClient);
  // const client = await Client.create({ name, email, password, numTel });
  // const token = client.createJWT();

  const verToken = client.createVerJWT();
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASSWORD },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.GMAIL_EMAIL, // sender address
    to: client.email, // list of receivers
    subject: "Email Verification", // Subject line
    // text: `Dear ${client.name} please confirm your account using this link: 172.16.134.111:3000/api/v1/auth/Client/verify/${verToken}`,
    html: verification(client.firstname + " " + client.lastname, verToken),
  });
  transporter.sendMail(info);

  res.status(StatusCodes.OK).json({
    client,
    // token,
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
  // console.log(client);
  const isPasswordCorrect = await client.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }

  const access_token = generateAccessToken(client._id);
  const refresh_token = jwt.sign(
    { Client: client._id },
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
  return jwt.sign({ Client: id }, process.env.ACCESS_TOKEN, {
    expiresIn: "60s",
  });
}
//   const token = client.createJWT();

//   client.password = undefined;
//   res.status(StatusCodes.OK).json({ client, token, location: client.location });
// };

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  const savedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!savedToken) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, client) => {
    if (err) return res.sendStatus(403);
    const token = generateAccessToken(client.Client);
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

const forgetPassword = async (req, res) => {
  const client = await Client.findOne({ email: req.body.email });
  if (!client) res.send("no client found");
  const verToken = client.createVerJWT();
  console.log(verToken);
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASSWORD },
  });
  const link = `http://localhost:3000/api/v1/auth/Client/resetPassword/${verToken}`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.GMAIL_EMAIL, // sender address
    to: client.email, // list of receivers
    subject: "Forget Password", // Subject line
    // text: `Dear ${client.name} please confirm your account using this link: 172.16.134.111:3000/api/v1/auth/Client/verify/${verToken}`,
    html: resetPasswordTempl(client.firstname, link),
  });
  transporter.sendMail(info);

  res.status(StatusCodes.OK).json({
    client,
  });
};
const getHash = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  console.log("salt", salt);
  const hash = await bcrypt.hash(pass, salt);

  console.log("hash", hash);
  return hash;
};

const resetPassword = async (req, res) => {
  try {
    const verified = jwt.verify(req.params.token, process.env.VER_JWT_SECRET);
    if (!verified) return res.send("Acces denied");
    if (!(req.body.password == req.body.confirmPassword))
      return res.send("please confirm with the right password");

    const hash = await getHash(req.body.password);

    console.log("hash", hash);
    const client = await Client.findOneAndUpdate(
      { _id: verified.Client },
      {
        $set: {
          password: hash,
        },
      }
    );
    console.log(client);
    if (!client) return res.send("Invalid Id...");

    res.status(StatusCodes.OK).json("password updated successfully !!!");
  } catch (err) {
    res.json({ message: err });
  }
};

const verifyClient = (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, process.env.VER_JWT_SECRET);
    // console.log(payload);
    Client.findOneAndUpdate(
      { _id: payload.Client },
      {
        $set: {
          verified: true,
        },
      }
    )
      .then((val) => {
        res.status(StatusCodes.OK).json("Account Verified !");
      })
      .catch((err) => {
        throw new BadRequestError(err);
      });
  } catch (error) {
    throw new BadRequestError(error);
  }
};

export {
  register,
  login,
  logout,
  verifyClient,
  forgetPassword,
  resetPassword,
  refreshToken,
};
