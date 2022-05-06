import { StatusCodes } from "http-status-codes";
import Client from "../models/Client.model.js";
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

// Add a new rating
const addRating = async (req, res) => {
  const { userId, SKU, rate, comment } = req.body;

  const prod = new Rating({
    userId,
    productSKU: SKU,
    rate,
    comment,
  });

  if (!userId || !SKU || !rate) {
    throw new BadRequestError("please provide all values");
  }
  const isProductExist = await Product.find({ SKU: SKU });
  if (!isProductExist) {
    throw new BadRequestError("Product id does not exist !!");
  }

  const p = await Rating.create(prod);
  res.status(StatusCodes.OK).json({ p });
};

// Get all ratings
const getAllRatings = async (req, res) => {
  await Rating.find({})
    .sort({ rate: -1 })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("No ratings to show")
        : res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get a rating by id
const getRatingById = async (req, res) => {
  await Rating.find({ _id: req.params.id })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("The rating does not exist")
        : res.status(StatusCodes.OK).json(val[0]);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Update rating by id
const updateRating = async (req, res) => {
  const prod = await Rating.findById(req.params.id);
  const p = new Rating({
    _id: req.params.id,
    userId: req.body.userId || prod.userId,
    productSKU: req.body.SKU || prod.SKU,
    rate: req.body.rate || prod.rate,
    comment: req.body.comment || prod.comment,
  });
  await Rating.updateOne({ _id: req.params.id }, p)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Rating updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Delete rating by id
const deleteRating = async (req, res) => {
  await Rating.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Rating Deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get rating by product id
const getRatingByProduct = async (req, res) => {
  await Product.findById(req.params.id)
    .then(async (val) => {
      if (val) {
        await Rating.find({ productSKU: val.SKU })
          .sort({ rate: -1 })
          .then((val) => {
            res.status(StatusCodes.OK).json(val);
          });
      }
    })
    .catch((err) => {
      throw new BadRequestError(err);
    });
};

const getRatingBySKU = (req, res) => {
  Rating.find({ productSKU: req.params.SKU })
    .limit(5)
    .sort({ createdAt: -1 })
    .then(async (val) => {
      if (val.length == 0) {
        res.status(StatusCodes.OK).json("No reviews");
      } else {
        let arr = [];
        console.log(val);
        for (let x of val) {
          let cli = await Client.findOne({ _id: x.userId });
          console.log(cli);
          let rat = {
            id: x._id,
            client: cli.firstname + " " + cli.lastname,
            stars: x.rate,
            date: x.createdAt,
            pictture: cli.profile_img,
            comment: x.comment,
          };
          console.log(rat);

          arr.push(rat);
        }
        res.status(StatusCodes.OK).json(arr);
      }
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export {
  getRatingBySKU,
  addRating,
  getAllRatings,
  getRatingById,
  updateRating,
  deleteRating,
  getRatingByProduct,
};
