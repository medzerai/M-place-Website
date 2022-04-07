import { StatusCodes } from "http-status-codes";
import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";
import Rating from "../models/Rating.model.js";
import Variable from "../models/Variable.model.js";
import Filter from "../models/Filter.model.js";

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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

// Add a new product
const addProduct = async (req, res) => {
  const {
    name,
    SKU,
    marque,
    short_description,
    description,
    category,
    filters,
    product_imgs,
    reduction_percentage,
    visibility,
  } = req.body;

  if (
    !name ||
    !SKU ||
    !marque ||
    !product_imgs ||
    !description ||
    !short_description ||
    !category
  ) {
    throw new BadRequestError("please provide all values");
  }
  const isCategoryExist = await Category.find({ _id: category });
  if (!isCategoryExist) {
    throw new BadRequestError("Category id does not exist !!");
  }

  let authHeader = req.headers.authorization;
  authHeader = authHeader || authHeader.startsWith("Bearer");
  const token = authHeader.split(" ")[1];
  const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
  // const poId = mongoose.Types.ObjectId(payload.PO);

  const product = new Product({
    name,
    SKU,
    marque,
    short_description,
    description,
    product_imgs,
    categoryId: category,
    Filter_list: filters,
    visibility: visibility || false,
    reduction_percentage: reduction_percentage || 0,
    PostedBy: payload.PO,
  });
  const prod = await Product.create(product);
  res.status(StatusCodes.OK).json({ prod });
};

const addProductWithJson = async (req, res) => {
  try {
    const { data } = req.body;
    let f_list = [];
    for (x of data.filters) {
      let v_list = [];
      for (y of x.Variable_list) {
        const v = new Variable({
          name: y.name,
          option: y.option,
        });
        const variable = await Variable.create(v);
        v_list.push(variable._id);
      }
      const f = new Filter({
        name: x.name,
        Variable_list: v_list,
        quantity: x.quantity,
        price: x.price,
      });
      const filter = await Filter.create(f);
      f_list.push(filter._id);
    }
    const isCategoryExist = await Category.find({ _id: data.category });
    if (!isCategoryExist) {
      throw new BadRequestError("Category id does not exist !!");
    }

    let authHeader = req.headers.authorization;
    authHeader = authHeader || authHeader.startsWith("Bearer");
    const token = authHeader.split(" ")[1];
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
    // const poId = mongoose.Types.ObjectId(payload.PO);

    const p = new Product({
      name: data.name,
      SKU: data.SKU,
      marque: data.marque,
      short_description: data.short_description,
      description: data.description,
      product_imgs: data.product_imgs,
      categoryId: data.category,
      Filter_list: f_list,
      visibility: data.visibility || false,
      reduction_percentage: data.reduction_percentage || 0,
      PostedBy: payload.PO,
    });
    const product = await Product.create(p);
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    throw new BadRequestError(error);
  }
};

// Get all products
const getAllProducts = (req, res) => {
  Product.find({})
    .populate("categoryId")
    .populate({
      path: "Filter_list",
      populate: {
        path: "Variable_list",
        model: "Variable",
      },
    })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("No products to show")
        : res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get product by id
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

// Update product by id
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const newProduct = new Product({
    _id: req.params.id,
    name: req.body.name || product.name,
    SKU: req.body.SKU || product.SKU,
    marque: req.body.marque || product.marque,
    description: req.body.description || product.description,
    categoryId: req.body.category || product.categoryId,
    Filter_list: req.body.filters || product.Filter_list,
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

// Delete product by id
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

// Get poduct by category name
const getProductByCategory = async (req, res) => {
  await Category.find({ name: req.params.category })
    .then(async (cat) => {
      await Product.find({ categoryId: cat[0]._id, visibility: true })
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

// Get product by marque name
const getProductByMarque = async (req, res) => {
  await Product.find({ marque: req.params.marque, visibility: true })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("No products to show")
        : res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Add filters to the product
const addFiltersToProduct = async (req, res) => {
  const fil = await Product.findById(req.params.id);
  req.body.filters.map((val) =>
    !fil.Filter_list.includes(val) ? fil.Filter_list.push(val) : ""
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

// Delete filters form a product
const deleteFiltersFromProduct = async (req, res) => {
  const fil = await Product.findById(req.params.id);
  req.body.filters.map((val) =>
    fil.Filter_list.includes(val)
      ? fil.Filter_list.splice(fil.Filter_list.indexOf(val), 1)
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

// Get product filter names
const getProductFilters = (req, res) => {
  var result = [];
  Product.findById(req.params.id)
    .populate({
      path: "Filter_list",
      populate: {
        path: "Variable_list",
        model: "Variable",
      },
    })
    .then((val) => {
      val.Filter_list.forEach((val) => {
        val.Variable_list.forEach((val) =>
          !result.includes(val.name) ? result.push(val.name) : ""
        );
      });
      res.status(StatusCodes.OK).json({ filter_names: result });
    });
};

const getProductBySKU = (req, res) => {
  Product.find({ SKU: req.params.SKU })
    .populate("categoryId")
    .populate({
      path: "Filter_list",
      populate: {
        path: "Variable_list",
        model: "Variable",
      },
    })
    .then(async (val) => {
      if (val.length == 0)
        res.status(StatusCodes.OK).json("No products to show");
      else {
        const tab = await getFilterAndProducts(
          req.body.filters || [],
          req.body.filterBy || "",
          req.body.page || 1,
          val
        );
        res.status(StatusCodes.OK).json(tab.products[0]);
      }
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const checkVariables = (vlist, f) => {
  let t = [...f];
  console.log("vlist", vlist);
  console.log("before", t);
  for (let x of vlist) {
    let j = 0;
    while (j < t.length) {
      if (x.name == t[j].variable && x.option == t[j].value) {
        t.splice(j, 1);
        break;
      }
      j++;
    }
  }
  console.log("after", t, t.length == 0);

  if (t.length == 0) {
    return true;
  } else {
    return false;
  }
};
const variable_name_exist = (n, t) => {
  for (let i of t) {
    if (i.name == n) {
      return true;
    }
  }
  return false;
};

const addOption = (n, o, t) => {
  for (let i of t) {
    if (i.name == n) {
      if (i.option.length == 0) {
        i.option.push({ name: o, nombreProduct: 1 });
      } else {
        let ok = false;
        for (let j of i.option) {
          if (j.name == o) {
            ok = true;
            j.nombreProduct++;
          }
        }
        if (!ok) {
          i.option.push({ name: o, nombreProduct: 1 });
        }
      }
    }
  }
};

const getRatingForSKU = async (sku, rat) => {
  let s = 0;
  let n = 0;
  for (let x of rat) {
    if (x.productSKU == sku) {
      s += x.rate;
      n++;
    }
  }
  return s / n;
};

const getMyProducts = async (req, res) => {
  let authHeader = req.headers.authorization;
  authHeader = authHeader || authHeader.startsWith("Bearer");
  const token = authHeader.split(" ")[1];
  const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
  const poId = mongoose.Types.ObjectId(payload.PO);
  console.log(poId);
  Product.find({ PostedBy: poId })
    .populate("categoryId")
    .populate({
      path: "Filter_list",
      populate: {
        path: "Variable_list",
        model: "Variable",
      },
    })
    .then(async (val) => {
      console.log(val);
      if (val.length == 0)
        res.status(StatusCodes.OK).json("No products to show");
      else {
        const tab = await getFilterAndProducts(
          req.body.filters || [],
          req.body.filterBy || "",
          req.body.page || 1,
          val
        );
        res.status(StatusCodes.OK).json({
          products: tab.products,
          number_of_products: tab.number_of_products,
        });
      }
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getFilterAndProducts = async (sf, filterby, page, val) => {
  let arr = [...val];

  let fils = [];
  for (let i of arr) {
    for (let j of i.Filter_list) {
      for (let k of j.Variable_list) {
        if (!variable_name_exist(k.name, fils)) {
          fils.push({
            name: k.name,
            option: [],
          });
        }
        addOption(k.name, k.option, fils);
      }
    }
  }
  var tab = {
    filter: fils,
    products: [],
    number_of_products: 0,
  };

  const rat = await Rating.find({}).exec();
  for (let i of arr) {
    let stars = await getRatingForSKU(i.SKU, rat);

    tab.products.push({
      id: i.SKU,
      name: i.name,
      stars: stars,
      price: i.Filter_list[0].price,
      reduction_percentage: i.reduction_percentage,
      picture: i.product_imgs[0],
      // link: link,
    });
  }
  tab.number_of_products = tab.products.length;
  if (filterby == "pc") {
    tab.products.sort((a, b) =>
      a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    );
  } else if (filterby == "pd") {
    tab.products.sort((a, b) =>
      a.price < b.price ? 1 : b.price < a.price ? -1 : 0
    );
  } else if (filterby == "r") {
    tab.products.sort((a, b) =>
      a.stars < b.stars ? 1 : b.stars < a.stars ? -1 : 0
    );
  }
  tab.products = tab.products.splice((page - 1) * 48, 48);
  return tab;
};

const searchProduct = (req, res) => {
  const reg = new RegExp(req.body.string);
  Product.find({
    name: { $regex: reg, $options: "i" },
    visibility: true,
  })
    .populate({
      path: "Filter_list",
      populate: {
        path: "Variable_list",
        model: "Variable",
      },
    })
    .then(async (val) => {
      const tab = await getFilterAndProducts(
        req.body.filters || [],
        req.body.filterBy || "",
        req.body.page || 1,
        val
      );
      res.status(StatusCodes.OK).json(tab);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export {
  addProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getProductByMarque,
  addFiltersToProduct,
  deleteFiltersFromProduct,
  getProductFilters,
  getProductBySKU,
  searchProduct,
};
