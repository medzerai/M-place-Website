import { fileUpload } from "../config/multer.config.js";
import {
  createImage,
  addImage,
  getAllImages,
  getImageById,
} from "../controllers/image.controller.js";

import express from "express";
const imageRouter = express.Router();

imageRouter.post("/file/upload", fileUpload.any(), createImage);
imageRouter.get("/files", getAllImages);
imageRouter.get("/file/:id", getImageById);

export default imageRouter;
