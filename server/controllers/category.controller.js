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

// Add a new Category
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

  await Category.create(cat);
  res.status(StatusCodes.OK).json({ message: " Category added successfully " });
};

// Get all the categories
const getAllCategories = async (req, res) => {
  await Category.find({})
    .then((val) => {
      let arr = [];
      val.map((x) => {
        if (x.parent == "/") arr.push({ id: x._id, category: x.name });
      });

      const newval = val.map((item) => ({ ...item, new: false }));
      console.log("2----", newval);
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getCategoryById = async (req, res) => {
  await Category.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Update the category by id
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

// Delete a category by id
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

const updateAll = async (req, res) => {};

export {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
