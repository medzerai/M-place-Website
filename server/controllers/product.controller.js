import { StatusCodes } from "http-status-codes";
import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";

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

const addProduct = async (req, res) => {
  const { name, SKU, marque, description, category, filters } = req.body;

  const prod = new Product({
    name,
    SKU,
    marque,
    description,
    categoryId: category,
    filterIds: filters,
  });

  if (!name || !SKU || !marque || !description || !category) {
    throw new BadRequestError("please provide all values");
  }
  const isCategoryExist = await Category.find({ _id: category });
  if (!isCategoryExist) {
    throw new BadRequestError("Category id does not exist !!");
  }

  const p = await Product.create(prod);
  res.status(StatusCodes.OK).json({ p });
};

const getAllProducts = async (req, res) => {
  const p = await Product.find({})
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("No products to show")
        : res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getProductById = async (req, res) => {
  const p = await Product.find({ _id: req.params.id })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("The product does not exist")
        : res.status(StatusCodes.OK).json(val[0]);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const updateProduct = async (req, res) => {
  const prod = await Product.findById(req.params.id);
  const p = new Product({
    _id: req.params.id,
    name: req.body.name || prod.name,
    SKU: req.body.SKU || prod.SKU,
    marque: req.body.marque || prod.marque,
    description: req.body.description || prod.description,
    categoryId: req.body.category || prod.categoryId,
    filterIds: req.body.filters || prod.filterIds,
  });
  Product.updateOne({ _id: req.params.id }, p)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Product updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const deleteProduct = async (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Product Deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const addFiltersToProduct = async (req, res) => {
  const prod = await Product.findById(req.params.iduser);
  req.body.filters.map((val) => prod.filterIds.push(val));
  Product.updateOne({ _id: req.params.id }, prod)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Filters added to Product successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// const deleteFiltersFromProduct = async (req, res) => {
//   const prod = await Product.findById(req.params.iduser);
//   req.body.filters.map((val) => prod.filterIds.push(val));
//   Product.updateOne({ _id: req.params.id }, prod)
//     .then(() => {
//       res.status(StatusCodes.CREATED).json({
//         message: "Filters added to Product successfully!",
//       });
//     })
//     .catch((error) => {
//       throw new BadRequestError(error);
//     });
// };

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addFiltersToProduct,
};
