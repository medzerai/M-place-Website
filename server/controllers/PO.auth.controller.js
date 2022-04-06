import PO from "../models/PO.model.js";
import { StatusCodes } from "http-status-codes";
import RefreshToken from "../models/RefreshToken.model.js";
import verificationTempl from "../templates/validation.js";
import resetPasswordTempl from "../templates/resetPassword.js";

import jwt from "jsonwebtoken";

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

//  Sign in a PO
const register = async (req, res) => {
  const {
    company_name,
    company_email,
    password,
    logo_url,
    country,
    city,
    state,
    zip_code,
    address,
    professional_phone_number,
    verification,
    creation_date,
    tax_ID_number,
    owner_firstname,
    owner_lastname,
    tax_ID_card,
    owner_ID_type,
    owner_ID,
    RNE_number,
  } = req.body;
  if (
    !company_name ||
    !company_email ||
    !password ||
    !logo_url ||
    !country ||
    !city ||
    !state ||
    !zip_code ||
    !address ||
    !professional_phone_number ||
    !creation_date ||
    !tax_ID_number ||
    !owner_firstname ||
    !owner_lastname ||
    !tax_ID_card ||
    !owner_ID_type ||
    !owner_ID ||
    !RNE_number
  ) {
    throw new BadRequestError("please provide all values");
  }
  const newPO = new PO({
    company_name,
    company_email,
    password,
    logo_url,
    country,
    city,
    state,
    zip_code,
    address,
    professional_phone_number,
    verification,
    creation_date,
    tax_ID_number,
    owner_firstname,
    owner_lastname,
    tax_ID_card,
    owner_ID_type,
    owner_ID,
    RNE_number,
  });

  const POAlreadyExists = await PO.findOne(
    { company_email } || { professional_phone_number }
  );
  if (POAlreadyExists) {
    throw new BadRequestError("PO already exists");
  }

  const po = await PO.create(newPO);
  const verToken = po.createVerJWT();
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASSWORD },
  });
  const link = `http://localhost:3000/api/v1/auth/PO/verify/${verToken}`;
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.GMAIL_EMAIL, // sender address
    to: po.company_email, // list of receivers
    subject: "Email Verification For Product Owner", // Subject line
    // text: `Dear ${client.name} please confirm your account using this link: 172.16.134.111:3000/api/v1/auth/Client/verify/${verToken}`,
    html: verificationTempl(po.company_name, link),
  });
  transporter.sendMail(info);

  res.status(StatusCodes.OK).json({
    po,
  });
};

// Log in a PO

const login = async (req, res) => {
  const { company_email, password } = req.body;
  if (!company_email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const po = await PO.findOne({ company_email }).select(
    "+password +verification"
  );
  if (!po) {
    throw new BadRequestError("Invalid Credentials");
  }
  console.log(po);
  if (po.verification != 2) {
    if (po.verification == 3) {
      throw new BadRequestError("Account Blocked");
    } else {
      throw new BadRequestError(
        "Account not verified yet, Please check your mail !!"
      );
    }
  }
  console.log(po);
  const isPasswordCorrect = await po.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }

  const access_token = generateAccessToken(po._id);
  const refresh_token = jwt.sign({ PO: po._id }, process.env.REFRESH_TOKEN);
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
  return jwt.sign({ PO: id }, process.env.ACCESS_TOKEN, {
    expiresIn: "1d",
  });
}

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  const savedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!savedToken) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, po) => {
    if (err) return res.sendStatus(403);
    const token = generateAccessToken(po.PO);
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
  const po = await PO.findOne({ company_email: req.body.email });
  if (!po) res.send("No Product owner found");
  const verToken = po.createVerJWT();
  console.log(verToken);
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASSWORD },
  });
  const link = `http://localhost:3000/api/v1/auth/PO/resetPassword/${verToken}`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.GMAIL_EMAIL, // sender address
    to: po.company_email, // list of receivers
    subject: "Forget Password For Product Owner", // Subject line
    // text: `Dear ${client.name} please confirm your account using this link: 172.16.134.111:3000/api/v1/auth/Client/verify/${verToken}`,
    html: resetPasswordTempl(po.company_name, link),
  });
  transporter.sendMail(info);

  res.status(StatusCodes.OK).json({
    po,
  });
};

const getHash = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);

  return hash;
};
const resetPassword = async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, process.env.VER_JWT_SECRET);
    if (!payload) return res.send("Acces denied");
    if (!(req.body.password == req.body.confirmPassword))
      return res.send("please confirm with the right password");

    const hash = await getHash(req.body.password);

    console.log("hash", hash);
    const po = await PO.findOneAndUpdate(
      { _id: payload.PO },
      {
        $set: {
          password: hash,
        },
      }
    );
    console.log(po);
    if (!po) return res.send("Invalid Id...");

    res.status(StatusCodes.OK).json("password updated successfully !!!");
  } catch (err) {
    res.json({ message: err });
  }
};

const verifyPO = async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, process.env.VER_JWT_SECRET);
    const po = await PO.findById(payload.PO);
    if (!po) {
      throw new BadRequestError("Product Owner does not exist !!!");
    }
    PO.findOneAndUpdate(
      { _id: payload.PO },
      {
        $set: {
          verification: 1,
        },
      }
    );
    const rdv = await Rdv.find({ for_PO: po._id });
    if (rdv) {
      throw new BadRequestError("Product Owner already had a Rendez-vous !!!");
    }
    // const d = new Date();

    const v = new Rdv({
      for_PO: po._id,
      date:
        date ||
        randomDate(
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 7))
        ),
    });

    Rdv.create(v)
      .then((rdv) => {
        res
          .status(StatusCodes.OK)
          .json("Account Verified and Rendez-vous set :", rdv);
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
  refreshToken,
  forgetPassword,
  resetPassword,
  verifyPO,
};
