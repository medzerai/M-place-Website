import { StatusCodes } from "http-status-codes";
import Category from "../models/Category.model.js";
import Filter from "../models/Filter.model.js";
import Product from "../models/Product.model.js";
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

const addProduct = async (req, res) => {
  const { name, SKU, marque, description, category, filters } = req.body;

  const product = new Product({
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

  const prod = await Product.create(product);
  res.status(StatusCodes.OK).json({ prod });
};

const getAllProducts = async (req, res) => {
  await Product.find({})
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
  await Product.find({ _id: req.params.id })
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
  const product = await Product.findById(req.params.id);
  const newProduct = new Product({
    _id: req.params.id,
    name: req.body.name || product.name,
    SKU: req.body.SKU || product.SKU,
    marque: req.body.marque || product.marque,
    description: req.body.description || product.description,
    categoryId: req.body.category || product.categoryId,
    filterIds: req.body.filters || product.filterIds,
  });

  Product.updateOne({ _id: req.params.id }, newProduct)
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

const getProductByCategory = async (req, res) => {
  await Category.find({ name: req.params.category })
    .then(async (cat) => {
      await Product.find({ categoryId: cat[0]._id })
        .then((val) => {
          val.length == 0
            ? res.status(StatusCodes.OK).json("No products to show")
            : res.status(StatusCodes.OK).json(val);
        })
        .catch((error) => {
          throw new BadRequestError(error);
        });
    })
    .catch((err) => {
      throw new BadRequestError(err);
    });
};

const getProductByMarque = async (req, res) => {
  await Product.find({ marque: req.params.marque })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("No products to show")
        : res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const addFiltersToProduct = async (req, res) => {
  const fil = await Product.findById(req.params.id);
  req.body.filters.map((val) =>
    !fil.filterIds.includes(val) ? fil.filterIds.push(val) : ""
  );
  Product.updateOne({ _id: req.params.id }, fil)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Filters added to Product successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const deleteFiltersFromProduct = async (req, res) => {
  const fil = await Product.findById(req.params.id);
  req.body.filters.map((val) =>
    fil.filterIds.includes(val)
      ? fil.filterIds.splice(fil.filterIds.indexOf(val), 1)
      : ""
  );
  Product.updateOne({ _id: req.params.id }, fil)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Filters deleted from Product successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getProductFilters = async (req, res) => {
  var result = [];

  const a = async () => {
    const product = await Product.findById(req.params.id).exec();
    var filter;
    
    product.filterIds.forEach(async (item) => {
      filter = await Filter.findById(item).exec();
      var variable;
      filter.variableIds.forEach(async (val) => {
        variable = await Variable.findById(val).exec();
        console.log("1--", result);
        !result.includes(variable.name) ? result.push(variable.name) : "";
      });
    });
    console.log("2--", result);
  };
  await a();

  console.log("3--", result);

  // await Product.findById(req.params.id)
  //   .then((val) => {
  //     val.filterIds.forEach((item) =>
  //       Filter.findById(item)
  //         .then((itm) => {
  //           itm.variableIds.forEach((val) => {
  //             Variable.findById(val)
  //               .then((a) => {
  //                 console.log("1--", result);
  //                 !result.includes(a.name) ? result.push(a.name) : "";
  //               })
  //               .catch((err) => console.log(err));
  //           });
  //         })
  //         .catch((err) => console.log(err))
  //     );
  //     console.log("2--", result);
  //   })
  //   .catch((err) => console.log(err));
  // console.log("3--", result);
};

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getProductByMarque,
  addFiltersToProduct,
  deleteFiltersFromProduct,
  getProductFilters,
};
