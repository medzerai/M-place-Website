import { StatusCodes } from "http-status-codes";
import Client from "../models/Client.model.js";
import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";
import Rating from "../models/Rating.model.js";
import Settings from "../models/Settings.model.js";

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

const getMinPrice = (products) => {
  let min = -1;
  for (let i of products) {
    for (let j of i.Filter_list) {
      if (min == -1) {
        min = j.price;
      } else {
        if (j.price < min) {
          min = j.price;
        }
      }
    }
  }
  return min;
};

const get3Pictures = async (catId) => {
  let t = [];
  const ps = await Product.find({ categoryId: catId }).limit(3);
  for (let i of ps) {
    t.push(i.product_imgs[0]);
  }
  return t;
};

const getCategories = async (categories) => {
  let catlist = [];
  for (let i of categories) {
    const ps = await Product.find({ categoryId: i })
      .populate("categoryId")
      .populate({
        path: "Filter_list",
        populate: {
          path: "Variable_list",
          model: "Variable",
        },
      });
    const minP = await getMinPrice(ps);
    const pics3 = await get3Pictures(i);
    const c = await Category.findById(i);
    catlist.push({
      id: c._id,
      title: c.name,
      minPrice: minP,
      pictures: pics3,
    });
  }

  return catlist;
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
  return s / n || 0;
};

const getProducts = async (products) => {
  let prodlist = [];

  for (let i of products) {
    const p = await Product.findById(i)
      .populate("categoryId")
      .populate({
        path: "Filter_list",
        populate: {
          path: "Variable_list",
          model: "Variable",
        },
      });
    const rat = await Rating.find({}).exec();
    // const cat = await Category.find({}).exec();

    let stars = await getRatingForSKU(p.SKU, rat);
    // let link = await getCategoryLink(i.categoryId._id, cat);

    prodlist.push({
      id: p.SKU,
      name: p.name,
      SKU: p.SKU,
      description: p.description,
      short_description: p.short_description,
      stars: stars,
      price: p.Filter_list[0].price,
      reduction_percentage: p.reduction_percentage,
      picture: p.product_imgs,
      // link: link,
    });
  }
  console.log(prodlist);
  return prodlist;
};

const getPartners = (partner) => {
  let partlist = [];

  for (let i of partner) {
    const p = JSON.parse(i);
    partlist.push(p);
  }

  return partlist;
};

const CreateSettings = async (req, res) => {
  const {
    carousel,
    categories,
    featuredProduct,
    recommendedProduct,
    partner,
    terms_conditions,
    Privacy_Policy,
    AboutUs,
  } = req.body;

  if (
    !carousel ||
    !categories ||
    !featuredProduct ||
    !recommendedProduct ||
    !partner ||
    !terms_conditions ||
    !Privacy_Policy ||
    !AboutUs
  ) {
    throw new BadRequestError("setting missing!!");
  }
  const cat = await getCategories(categories);
  const featProd = await getProducts(featuredProduct);
  const recomProd = await getProducts(recommendedProduct);
  const partnerlist = await getPartners(partner);

  const setting = new Settings({
    carousel,
    categories,
    featuredProduct,
    recommendedProduct,
    partner,
    terms_conditions,
    Privacy_Policy,
    AboutUs,
  });
  const s = await Settings.create(setting);
  res.status(StatusCodes.OK).json({
    carousel,
    categories: cat,
    featuredProduct: featProd,
    recommendedProduct: recomProd,
    partner: partnerlist,
    terms_conditions,
    Privacy_Policy,
    AboutUs,
  });
};

const getSettings = (req, res) => {
  Settings.find({})
    .then(async (val) => {
      const {
        carousel,
        categories,
        featuredProduct,
        recommendedProduct,
        partner,
        terms_conditions,
        Privacy_Policy,
        AboutUs,
      } = val[0];
      const cat = await getCategories(categories);
      const featProd = await getProducts(featuredProduct);
      const recomProd = await getProducts(recommendedProduct);
      const partnerlist = await getPartners(partner);
      res.status(StatusCodes.OK).json({
        carousel,
        categories: cat,
        featuredProduct: featProd,
        recommendedProduct: recomProd,
        partner: partnerlist,
        terms_conditions,
        Privacy_Policy,
        AboutUs,
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const updateSettings = async (req, res) => {
  const s = await Settings.findOne({});
  const newSettings = {
    carousel: req.body.carousel || s.carousel,
    categories: req.body.categories || s.categories,
    featuredProduct: req.body.featuredProduct || s.featuredProduct,
    recommendedProduct: req.body.recommendedProduct || s.recommendedProduct,
    partner: req.body.partner || s.partner,
    terms_conditions: req.body.terms_conditions || s.terms_conditions,
    Privacy_Policy: req.body.Privacy_Policy || s.Privacy_Policy,
    AboutUs: req.body.AboutUs || s.AboutUs,
  };
  Settings.updateOne({}, { $set: newSettings })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Settings updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export { CreateSettings, getSettings, updateSettings };
