import PO from "../models/PO.model.js";
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
    tax_ID_card,
    owner_ID_type,
    owner_ID,
    RNE_number,
  } = req.body;
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
    tax_ID_card,
    owner_ID_type,
    owner_ID,
    RNE_number,
  });
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
    !tax_ID_card ||
    !owner_ID_type ||
    !owner_ID ||
    !RNE_number
  ) {
    throw new BadRequestError("please provide all values");
  }

  const POAlreadyExists = await PO.findOne(
    { company_email } || { professional_phone_number }
  );
  if (POAlreadyExists) {
    throw new BadRequestError("PO already exists");
  }

  const po = await PO.create(newPO);
  const token = po.createJWT();
  res.status(StatusCodes.OK).json({
    Product_Owner: {
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
      tax_ID_card,
      owner_ID_type,
      owner_ID,
      RNE_number,
    },
    token,
  });
};

// Log in a PO

const login = async (req, res) => {
  const { company_email, password } = req.body;
  if (!company_email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const po = await PO.findOne({ company_email }).select("+password");
  if (!po) {
    throw new BadRequestError("Invalid Credentials");
  }
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
    const token = generateAccessToken({ id: po._id });
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

// Update a PO
const updatePO = async (req, res) => {
  const po = await PO.findOne({ _id: req.PO.POId });

  po.company_name = req.body.company_name || po.company_name;
  po.company_email = req.body.company_email || po.company_email;
  po.password = req.body.password || po.password;
  po.logo_url = req.body.logo_url || po.logo_url;
  po.country = req.body.country || po.country;
  po.city = req.body.city || po.city;
  po.state = req.body.state || po.state;
  po.zip_code = req.body.zip_code || po.zip_code;
  po.address = req.body.address || po.address;
  po.professional_phone_number =
    req.body.professional_phone_number || po.professional_phone_number;
  po.verification = req.body.verification || po.verification;
  po.creation_date = req.body.creation_date || po.creation_date;
  po.tax_ID_number = req.body.tax_ID_number || po.tax_ID_number;
  po.tax_ID_card = req.body.tax_ID_card || po.tax_ID_card;
  po.owner_ID_type = req.body.owner_ID_type || po.owner_ID_type;
  po.owner_ID = req.body.owner_ID || po.owner_ID;
  po.RNE_number = req.body.RNE_number || po.RNE_number;

  await po.save();
  const token = po.createJWT();
  res.status(StatusCodes.OK).json({ po, token });
};

export { register, login, logout, refreshToken, updatePO };
