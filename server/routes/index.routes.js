import express from "express";
import ClientAuthRouter from "./Client.auth.routes.js";
import ClientRouter from "./Client.routes.js";

import AdminRouter from "./Admin.auth.routes.js";

import POAuthRouter from "./PO.auth.routes.js";
import PORouter from "./PO.routes.js";

import imageRouter from "./image.routes.js";
import pdfFileRouter from "./PDFfile.routes.js";

import CategoryRouter from "./category.routes.js";
import FilterRouter from "./filter.routes.js";
import VariableRouter from "./variable.routes.js";
import ProductRouter from "./product.routes.js";
import RatingRouter from "./rating.routes.js";
import RdvRouter from "./Rdv.routes.js";
import messageRouter from "./Message.routes.js";
import roomRouter from "./Room.routes.js";
import SettingsRouter from "./Settings.routes.js";

const router = express.Router();

router.use("/api/v1/auth", ClientAuthRouter, POAuthRouter, AdminRouter);

router.use(
  "/",
  roomRouter,
  messageRouter,
  imageRouter,
  pdfFileRouter,
  ClientRouter,
  PORouter,
  CategoryRouter,
  ProductRouter,
  FilterRouter,
  VariableRouter,
  RatingRouter,
  RdvRouter,
  SettingsRouter
);

export default router;
