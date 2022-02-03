import {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import express from "express";
const CategoryRouter = express.Router();

CategoryRouter.route("/addCategory").post(addCategory);
CategoryRouter.route("/categories").get(getAllCategories);
CategoryRouter.route("/categories/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

export default CategoryRouter;
