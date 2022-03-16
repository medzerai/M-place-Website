// [
//   company_name,
//   company_email,
//   password,
//   logo_url,
//   country,
//   city,
//   state,
//   zip_code,
//   address,
//   professional_phone_number,
//   verification,
//   creation_date,
//   tax_ID_number,
//   tax_ID_card,
//   owner_ID_type,
//   owner_ID,
//   RNE_number,
// ];

import { StatusCodes } from "http-status-codes";
import PO from "../models/PO.model.js";

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

//populate when image url
// get all the product owners
const getAllPOs = async (req, res) => {
  await PO.find({})
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get a product owner by id
const getPOById = async (req, res) => {
  await PO.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// get none-approved product owners
const getNoneApprovedPOs = async (req, res) => {
  await PO.find({ verification: 1 })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// get functional product owners
const getFunctionalPOs = async (req, res) => {
  await PO.find({ verification: 2 })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// get blocked product owners
const getBlockedPOs = async (req, res) => {
  await PO.find({ verification: 3 })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// get deleted product owner
const getDeletedPOs = async (req, res) => {
  PO.find({ verification: 4 })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// verify the product owner account
const verifyPO = async (req, res) => {
  const po = await PO.find({ _id: req.params.id }).select("+verification");
  if (po.verification == 0) {
    PO.findOneAndUpdate({ _id: req.params.id }, { verification: 1 })
      .then(() => {
        res.status(StatusCodes.CREATED).json({
          message: "Product Owner verified successfully!",
        });
      })
      .catch((error) => {
        throw new BadRequestError(error);
      });
  } else {
    res.status(StatusCodes.CREATED).json({
      message: "Product Owner is already been verified !!",
    });
  }
};

// approve the product owner account (made by the admin)
const approvePO = async (req, res) => {
  const po = await PO.find({ _id: req.params.id }).select("+verification");
  if (po.verification == 1) {
    PO.findOneAndUpdate({ _id: req.params.id }, { verification: 2 })
      .then((val) => {
        res.status(StatusCodes.CREATED).json({
          message: "Product Owner approved successfully!",
        });
      })
      .catch((error) => {
        throw new BadRequestError(error);
      });
  } else {
    res.status(StatusCodes.CREATED).json({
      message: "Product Owner can't be approved !!",
    });
  }
};

// block the product owner account
const blockPO = async (req, res) => {
  const po = await PO.find({ _id: req.params.id }).select("+verification");
  if (po.verification == 2) {
    PO.findOneAndUpdate({ _id: req.params.id }, { verification: 3 })
      .then(() => {
        res.status(StatusCodes.CREATED).json({
          message: "Product Owner blocked successfully!",
        });
      })
      .catch((error) => {
        throw new BadRequestError(error);
      });
  } else {
    res.status(StatusCodes.CREATED).json({
      message: "Product Owner can't be blocked !!",
    });
  }
};

// unblock the product owner account
const unblockPO = async (req, res) => {
  const po = await PO.find({ _id: req.params.id }).select("+verification");
  if (po.verification == 3) {
    PO.findOneAndUpdate({ _id: req.params.id }, { verification: 2 })
      .then(() => {
        res.status(StatusCodes.CREATED).json({
          message: "Product Owner unblocked successfully!",
        });
      })
      .catch((error) => {
        throw new BadRequestError(error);
      });
  } else {
    res.status(StatusCodes.CREATED).json({
      message: "Product Owner is not blocked !!",
    });
  }
};

// delete the product owner account
const deletePO = async (req, res) => {
  PO.findOneAndUpdate({ _id: req.params.id }, { verification: 4 })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Product Owner deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Update a po by id
const updatePO = (req, res) => {
  const po = PO.findOne({ _id: req.params.id }).select("+verification");
  const updatePo = new PO({
    _id: req.params.id,
    company_name: req.body.company_name || po.company_name,
    company_email: req.body.company_email || po.company_email,
    password: req.body.password || po.password,
    logo_url: req.body.logo_url || po.logo_url,
    country: req.body.country || po.country,
    city: req.body.city || po.city,
    state: req.body.state || po.state,
    zip_code: req.body.zip_code || po.zip_code,
    address: req.body.address || po.address,
    professional_phone_number:
      req.body.professional_phone_number || po.professional_phone_number,
    verification: req.body.verification || po.verification,
    creation_date: req.body.creation_date || po.creation_date,
    tax_ID_number: req.body.tax_ID_number || po.tax_ID_number,
    tax_ID_card: req.body.tax_ID_card || po.tax_ID_card,
    owner_ID_type: req.body.owner_ID_type || po.owner_ID_type,
    owner_ID: req.body.owner_ID || po.owner_ID,
    RNE_number: req.body.RNE_number || po.RNE_number,
  });
  PO.updateOne({ _id: req.params.id }, updatePo)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Product Owner updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export {
  getAllPOs,
  getPOById,
  getNoneApprovedPOs,
  getFunctionalPOs,
  getBlockedPOs,
  getDeletedPOs,
  verifyPO,
  approvePO,
  blockPO,
  unblockPO,
  deletePO,
  updatePO,
};
