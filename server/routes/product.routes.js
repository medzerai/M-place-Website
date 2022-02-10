import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import express from "express";
const ProductRouter = express.Router();

ProductRouter.route("/addProduct").post(addProduct);
ProductRouter.route("/products").get(getAllProducts);
ProductRouter.route("/products/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

export default ProductRouter;
