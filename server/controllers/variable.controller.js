import { StatusCodes } from "http-status-codes";
import Variable from "../models/Variable.model.js";

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

const addVariable = async (req, res) => {
  const { name, option } = req.body;

  const v = new Variable({
    name,
    option,
  });

  if (!name || !option) {
    throw new BadRequestError("please provide all values");
  }

  const variable = await Variable.create(v);
  res.status(StatusCodes.OK).json({ variable });
};

const getAllVariables = async (req, res) => {
  const v = await Variable.find({})
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getVariableById = async (req, res) => {
  const v = await Variable.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const updateVariable = async (req, res) => {
  const v = new Variable({
    _id: req.params.id,
    name: req.body.name,
    option: req.body.option,
  });
  Variable.updateOne({ _id: req.params.id }, v)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Variable updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const deleteVariable = async (req, res) => {
  Variable.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Variable Deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export {
  addVariable,
  getAllVariables,
  getVariableById,
  updateVariable,
  deleteVariable,
};
