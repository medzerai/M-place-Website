import { imageUpload } from "../config/multer.config.js";
import {
  createImage,
  getAllImages,
  getImageById,
} from "../controllers/image.controller.js";

import express from "express";
const imageRouter = express.Router();

imageRouter.post("/img/upload", imageUpload.any(), createImage);
imageRouter.get("/imgs", getAllImages);
imageRouter.get("/img/:id", getImageById);

export default imageRouter;
