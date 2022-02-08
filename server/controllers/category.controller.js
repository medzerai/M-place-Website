import Category from "../models/Category.model.js";
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

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const addCategory = async (req, res) => {
  const { name, parent } = req.body;

  const cat = new Category({
    name,
    parent: parent || "/",
    category:
      parent === undefined || parent === "/" ? "/" + name : parent + "/" + name,
  });

  if (!name) {
    throw new BadRequestError("please provide all values");
  }

  const categoryAlreadyExists = await Category.findOne({
    name: cat.name,
    parent: cat.parent,
  });
  if (categoryAlreadyExists) {
    throw new BadRequestError("Category already exists");
  }

  const ctg = await Category.create(cat);
  res.status(StatusCodes.OK).json({ ctg });
};

const getAllCategories = async (req, res) => {
  const cat = await Category.find({})
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getCategoryById = async (req, res) => {
  const cat = await Category.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const updateCategory = async (req, res) => {
  const cat = new Category({
    _id: req.params.id,
    name: req.body.name,
    parent: req.body.parent || "/",
    category:
      req.body.parent === undefined || req.body.parent === "/"
        ? "/" + req.body.name
        : req.body.parent + "/" + req.body.name,
  });
  Category.updateOne({ _id: req.params.id }, cat)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Category updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const deleteCategory = async (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Category Deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
