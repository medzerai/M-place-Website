import {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  updateAll,
  deleteCategory,
  getCategoryFilterAndProducts,
  getCategoryId
} from "../controllers/category.controller.js";

import express from "express";
const CategoryRouter = express.Router();

CategoryRouter.route("/addCategory").post(addCategory);
CategoryRouter.route("/categories").get(getAllCategories);
CategoryRouter.route("/categories/updateAll").post(updateAll);
CategoryRouter.route("/categories/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);
CategoryRouter.route("/categoryProducts/:categoryName").post(
  getCategoryFilterAndProducts
);
CategoryRouter.route("/categoryId/:cat").get(getCategoryId);

export default CategoryRouter;
