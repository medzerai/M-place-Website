import { StatusCodes } from "http-status-codes";
import { fileUploads } from "../config/cloudinary.config.js";
import PDFfileModel from "../models/PDFfile.model.js";

// Add a pdf file to cloudinary and mongoDB
const createPdfFile = async (req, res) => {
  let fileDetails = {
    pdfFileName: req.files[0].originalname,
  };

  PDFfileModel.find({ pdfFileName: fileDetails.pdfFileName }, (err) => {
    if (err) {
      res.json({
        err: err,
        message: `There was a problem creating the file because: ${err.message}`,
      });
    } else {
      let attempt = {
        pdfFileName: req.files[0].originalname,
        pdfFileUrl: req.files[0].path,
        pdfFileId: "",
      };
      fileUploads(attempt.pdfFileUrl).then((result) => {
        let fileDetails = {
          pdfFileName: req.files[0].originalname,
          pdfFileUrl: result.url,
          pdfFileId: result.id,
          clientId: req.body.clientId,
          clientUsername: req.body.clientUsername,
        };

        PDFfileModel.create(fileDetails)
          .then((file) => {
            res.json({
              success: true,
              data: file,
            });
          })
          .catch((error) => {
            res.json({
              success: false,
              message: `Error creating file in the database: ${error.message}`,
            });
          });
      });
    }
  });
};

// Get all files registred in mongoDB
const getAllPdfFiles = async (req, res) => {
  await PDFfileModel.find({})
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      res.send(error);
    });
};

// Get image by id
const getPdfFileById = async (req, res) => {
  await PDFfileModel.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      res.send(error);
    });
};

export { createPdfFile, getAllPdfFiles, getPdfFileById };
