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

const convertJsonToCategories = (val) => {
  let cat;
  let catList = [];
  let addedCategory;
  // console.log("----", val);
  const addSubCategories = (par, arr) => {
    if (arr.length > 0) {
      arr.map(async (item) => {
        if (item.new == false) {
          cat = new Category({
            _id: item.id,
            name: item.category,
            parent: par,
          });
        } else {
          cat = new Category({
            name: item.category,
            parent: par,
          });
        }
        // console.log("****", cat);
        catList.push(cat);
        addSubCategories(cat._id, item.child);
      });
    }
    return 0;
  };

  val.map(async (item) => {
    if (item.new == false) {
      cat = new Category({
        _id: item.id,
        name: item.category,
        parent: "/",
      });
    } else {
      cat = new Category({
        name: item.category,
        parent: "/",
      });
    }
    // console.log("****", cat);
    catList.push(cat);
    addSubCategories(cat._id, item.child);
  });

  return catList;
};

const convertCategoryJson = (val) => {
  const checkSubCategories = (j, arr, val) => {
    let k;
    while (true) {
      if (j >= val.length) {
        break;
      }
      k = arr.filter((item) => {
        return item.id == val[j].parent;
      });

      if (k.length > 0) {
        arr[arr.indexOf(k[0])].child.push({
          id: val[j]._id,
          category: val[j].name,
          child: [],
          new: false,
        });
        val.splice(j, 1);
      } else {
        j++;
      }
    }
  };
  let j = 0;
  let arr = [];
  while (val.length != 0) {
    if (val[j].parent == "/") {
      arr.push({
        id: val[j]._id,
        category: val[j].name,
        child: [],
        new: false,
      });
      val.splice(j, 1);
    } else {
      checkSubCategories(j, arr, val);
      arr.map((v) => {
        checkSubCategories(j, v.child, val);
      });
    }
  }
  return arr;
};

// Add a new Category
const addCategory = async (req, res) => {
  const { name, parent } = req.body;

  const cat = new Category({
    name,
    parent: parent || "/",
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
const getAllCategories = (req, res) => {
  Category.find({})
    .then((val) => {
      const newVal = convertCategoryJson(val);
      res.status(StatusCodes.OK).json(newVal);
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

const updateAll = async (req, res) => {
  Category.deleteMany()
    .then(async () => {
      const categoryList = await convertJsonToCategories(req.body.categories);
      // console.log(categoryList);
      Category.insertMany(categoryList)
        .then((vals) => {
          res
            .status(StatusCodes.CREATED)
            .json("Categories Updated successfully !!");
        })
        .catch((err) => {
          res.status(StatusCodes.BAD_REQUEST).json(err);
        });
    })
    .catch((err) => {
      res.status(StatusCodes.BAD_REQUEST).json(err);
    });
};

export {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  updateAll,
  deleteCategory,
};
