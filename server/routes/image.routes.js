import { imageUpload } from "../config/multer.config.js";
import {
  createImage,
  addImage,
  getAllImages,
  getImageById,
} from "../controllers/image.controller.js";
import express from "express";

const imageRouter = express.Router();

imageRouter.post("/upload", imageUpload.any(), createImage);
imageRouter.get("/img", getAllImages);
imageRouter.get("/img/:id", getImageById);

export default imageRouter;
