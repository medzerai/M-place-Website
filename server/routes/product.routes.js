import {
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
} from "../controllers/product.controller.js";

import express from "express";
const ProductRouter = express.Router();

ProductRouter.route("/addProduct").post(addProduct);
ProductRouter.route("/products").get(getAllProducts);
ProductRouter.route("/myProducts").get(getMyProducts);
ProductRouter.route("/products/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);
ProductRouter.route("/products/SKU/:SKU").get(getProductBySKU);
ProductRouter.route("/products/getProductByCategory/:category").get(
  getProductByCategory
);
ProductRouter.route("/products/getProductByMarque/:marque").get(
  getProductByMarque
);
ProductRouter.route("/products/addFiltersToProduct/:id").patch(
  addFiltersToProduct
);
ProductRouter.route("/products/deleteFiltersFromProduct/:id").patch(
  deleteFiltersFromProduct
);
ProductRouter.route("/products/getProductFilters/:id").get(getProductFilters);

export default ProductRouter;
