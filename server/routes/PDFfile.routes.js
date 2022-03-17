import { fileUpload } from "../config/multer.config.js";
import {
  createPdfFile,
  getAllPdfFiles,
  getPdfFileById,
} from "../controllers/PDFfile.controller.js";

import express from "express";
const pdfFileRouter = express.Router();

pdfFileRouter.post("/file/upload", fileUpload.any(), createPdfFile);
pdfFileRouter.get("/files", getAllPdfFiles);
pdfFileRouter.get("/file/:id", getPdfFileById);

export default pdfFileRouter;
