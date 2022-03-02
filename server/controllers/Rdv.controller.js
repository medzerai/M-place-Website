import { StatusCodes } from "http-status-codes";
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

// Add a new Rendez-vous
const addRdv = async (req, res) => {
  const { for_PO, date } = req.body;

  const v = new Rdv({
    for_PO,
    date,
  });

  if (!for_PO || !date) {
    throw new BadRequestError("please provide all values");
  }

  const rdv = await Rdv.create(v);
  res.status(StatusCodes.OK).json({ rdv });
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
