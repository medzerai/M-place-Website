import { StatusCodes } from "http-status-codes";
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

// Add a new filter
const addFilter = async (req, res) => {
  const { name, variables, quantity, price, product_id } = req.body;
  const newFilter = new Filter({
    name,
    Variable_list: variables,
    quantity,
    price,
    product_id,
  });

  if (!name || !variables || !quantity || !price || !product_id) {
    throw new BadRequestError("please provide all values");
  }

  const filter = await Filter.create(newFilter);
  res.status(StatusCodes.OK).json({ filter });
};

const getAllFilters = async (req, res) => {
  await Filter.find({})
    .populate("Variable_list", "-_id")
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get a filter by id
const getFilterById = async (req, res) => {
  await Filter.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Update a filter by id
const updateFilter = async (req, res) => {
  const filter = Filter.findOne({ _id: req.params.id });
  const updateFil = new Filter({
    _id: req.params.id,
    name: req.body.name || filter.name,
    Variable_list: req.body.variables || filter.Variable_list,
    quantity: req.body.quantity || filter.quantity,
    price: req.body.price || filter.price,
    product_id: req.body.product_id || filter.product_id,
  });
  Filter.updateOne({ _id: req.params.id }, updateFil)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Filter updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Delete a filter by id
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

// Add variables to the filter
const addVariablesToFilter = async (req, res) => {
  const fil = await Filter.findById(req.params.id);
  req.body.variables.map((val) =>
    !fil.Variable_list.includes(val) ? fil.Variable_list.push(val) : ""
  );
  Filter.updateOne({ _id: req.params.id }, fil)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "variables added to Filter successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Delete variables from the filter
const deleteVariablesFromFilter = async (req, res) => {
  const fil = await Filter.findById(req.params.id);
  req.body.variables.map((val) =>
    fil.Variable_list.includes(val)
      ? fil.Variable_list.splice(fil.Variable_list.indexOf(val), 1)
      : ""
  );
  Filter.updateOne({ _id: req.params.id }, fil)
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
