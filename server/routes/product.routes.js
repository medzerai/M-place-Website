import {
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
} from "../controllers/product.controller.js";

import express from "express";
const ProductRouter = express.Router();

ProductRouter.route("/addProduct").post(addProduct);
ProductRouter.route("/products").get(getAllProducts);
ProductRouter.route("/products/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);
ProductRouter.route("/products/getProductByCategory/:id").get(
  getProductByCategory
);
ProductRouter.route("/products/getProductByMarque/:id").get(getProductByMarque);
ProductRouter.route("/products/addFiltersToProduct/:id").patch(
  addFiltersToProduct
);
ProductRouter.route("/products/addFiltersToProduct/:id").patch(
  deleteFiltersFromProduct
);

export default ProductRouter;
