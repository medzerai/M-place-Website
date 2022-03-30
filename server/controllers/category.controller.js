import Category from "../models/Category.model.js";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.model.js";
import Rating from "../models/Rating.model.js";

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

  while (j < val.length) {
    if (val[j].parent == "/") {
      arr.push({
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
  j = 0;
  while (true) {
    if (val.length == 0) {
      break;
    }
    // if (val[j].parent == "/") {
    //   arr.push({
    //     id: val[j]._id,
    //     category: val[j].name,
    //     child: [],
    //     new: false,
    //   });
    //   val.splice(j, 1);
    // } else {
    checkSubCategories(j, arr, val);
    arr.map((v) => {
      checkSubCategories(j, v.child, val);
    });
    // }
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

const getCategoryLink = async (catId, cat) => {
  let ch = "/";
  for (let x of cat) {
    if (String(catId) === String(x._id)) {
      if (x.parent == "/") {
        ch = ch + x.name;
        return ch;
      } else {
        ch = ch + x.name;
        return (await getCategoryLink(x.parent, cat)) + ch;
      }
    }
  }
  return "ch";
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

const getFilterAndProducts = async (catname, sf, filterby, page, val) => {
  let arr = [];
  for (let i of val) {
    if (i.categoryId.name == catname) {
      let g = false;
      for (let j of i.Filter_list) {
        if (checkVariables(j.Variable_list, sf)) {
          g = true;
          break;
        }
      }
      if (g) arr.push(i);
    }
  }
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
  const cat = await Category.find({}).exec();
  for (let i of arr) {
    let stars = await getRatingForSKU(i.SKU, rat);
    // let link = await getCategoryLink(i.categoryId._id, cat);

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

const getCategoryFilterAndProducts = (req, res) => {
  Product.find({})
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
          req.params.categoryName,
          req.body.filters || [],
          req.body.filterBy || "",
          req.body.page || 1,
          val
        );
        res.status(StatusCodes.OK).json(tab);
      }
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
  updateAll,
  deleteCategory,
  getCategoryFilterAndProducts,
};
