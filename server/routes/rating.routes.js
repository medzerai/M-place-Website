import {
  getRatingBySKU,
  addRating,
  getAllRatings,
  getRatingById,
  updateRating,
  deleteRating,
  getRatingByProduct,
} from "../controllers/rating.controller.js";

import express from "express";
const RatingRouter = express.Router();
RatingRouter.route("/ratings/SKU/:SKU").get(getRatingBySKU);
RatingRouter.route("/addRating").post(addRating);
RatingRouter.route("/ratings").get(getAllRatings);
RatingRouter.route("/ratings/:id")
  .get(getRatingById)
  .patch(updateRating)
  .delete(deleteRating);
RatingRouter.route("/ratings/getRatingByProduct/:id").get(getRatingByProduct);

export default RatingRouter;
