import express from "express";
import ClientRouter from "./Client.auth.routes.js";
import AdminRouter from "./Admin.auth.routes.js";
import AuthPORouter from "./PO.auth.routes.js";
import PORouter from "./PO.routes.js";
import CategoryRouter from "./category.routes.js";
import imageRouter from "./image.routes.js";
import FilterRouter from "./filter.routes.js";
import VariableRouter from "./variable.routes.js";
import ProductRouter from "./product.routes.js";
import RatingRouter from "./rating.routes.js";
import RdvRouter from "./Rdv.routes.js";

const router = express.Router();

router.use("/file", imageRouter);
router.use("/api/v1/auth", AuthPORouter, ClientRouter, AdminRouter);
router.use(
  "/",
  PORouter,
  CategoryRouter,
  ProductRouter,
  FilterRouter,
  VariableRouter,
  RatingRouter,
  RdvRouter
);

export default router;
