import { StatusCodes } from "http-status-codes";
import Category from "../models/Category.model.js";
import Filter from "../models/Filter.model.js";

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

const addFilter = async (req, res) => {
  const { name, variables, quantity, price } = req.body;

  const v = new Filter({
    name,
    variableIds: variables,
    quantity,
    price,
  });

  if (!name || !variables || !quantity || !price) {
    throw new BadRequestError("please provide all values");
  }

  const filter = await Filter.create(v);
  res.status(StatusCodes.OK).json({ filter });
};

const getAllFilters = async (req, res) => {
  const v = await Filter.find({})
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getFilterById = async (req, res) => {
  const v = await Filter.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const updateFilter = async (req, res) => {
  const v = new Filter({
    _id: req.params.id,
    name: req.body.name,
    variableIds: req.body.variables,
    quantity: req.body.quantity,
    price: req.body.price,
  });
  Filter.updateOne({ _id: req.params.id }, v)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Filter updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const deleteFilter = async (req, res) => {
  Filter.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Filter Deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const addVariablesToFilter = async (req, res) => {
  const f = await Filter.findById(req.params.id);
  req.body.variables.map((val) =>
    !f.variableIds.includes(val) ? f.variableIds.push(val) : ""
  );
  Filter.updateOne({ _id: req.params.id }, f)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "variables added to Filter successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const deleteVariablesFromFilter = async (req, res) => {
  const f = await Filter.findById(req.params.id);
  req.body.variables.map((val) =>
    f.variableIds.includes(val)
      ? f.variableIds.splice(f.variableIds.indexOf(val), 1)
      : ""
  );
  Filter.updateOne({ _id: req.params.id }, f)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Variables deleted from Filter successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export {
  addFilter,
  getAllFilters,
  getFilterById,
  updateFilter,
  deleteFilter,
  addVariablesToFilter,
  deleteVariablesFromFilter,
};
