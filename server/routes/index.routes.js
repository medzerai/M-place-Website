import express from "express";
import ClientRouter from "./auth.routes.js";
import CategoryRouter from "./category.routes.js";
import imageRouter from "./image.routes.js";
import FilterRouter from "./filter.routes.js";
import VariableRouter from "./variable.routes.js";
import ProductRouter from "./product.routes.js";
import RatingRouter from "./rating.routes.js";
const router = express.Router();

router.use("/file", imageRouter);
router.use("/api/v1/auth", ClientRouter);
router.use(
  "/",
  CategoryRouter,
  ProductRouter,
  FilterRouter,
  VariableRouter,
  RatingRouter
);

export default router;
