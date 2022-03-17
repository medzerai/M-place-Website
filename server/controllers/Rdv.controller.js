import { StatusCodes } from "http-status-codes";
import PO from "../models/PO.model.js";
import Rdv from "../models/Rdv.model.js";

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
//generate random date
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Add a new Rendez-vous
const addRdv = async (req, res) => {
  const { for_PO, date } = req.body;
  if (!for_PO) {
    throw new BadRequestError("please provide all values");
  }

  const po = await PO.findById(for_PO);
  if (!po) {
    throw new BadRequestError("Product Owner does not exist !!!");
  }

  const rdv = await Rdv.find({ for_PO: for_PO });
  if (rdv) {
    throw new BadRequestError("Product Owner already had a Rendez-vous !!!");
  }
  // const d = new Date();

  const v = new Rdv({
    for_PO,
    date:
      date ||
      randomDate(
        new Date(),
        new Date(new Date().setDate(new Date().getDate() + 7))
      ),
  });

  Rdv.create(v)
    .then((rdv) => {
      res.status(StatusCodes.OK).json({ rdv });
    })
    .catch((err) => {
      throw new BadRequestError(err);
    });
};

// Get all Rendez-vous
const getAllRdvs = async (req, res) => {
  Rdv.find({})
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get Rendez-vous by id
const getRdvById = async (req, res) => {
  Rdv.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Update Rendez-vous by id
const updateRdv = async (req, res) => {
  const v = new Rdv({
    _id: req.params.id,
    for_PO: req.body.for_PO,
    date: req.body.date,
  });
  Rdv.updateOne({ _id: req.params.id }, v)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Rendez-vous updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Delete Rendez-vous by id
const deleteRdv = async (req, res) => {
  Rdv.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Rendez-vous Deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export { addRdv, getAllRdvs, getRdvById, updateRdv, deleteRdv };
