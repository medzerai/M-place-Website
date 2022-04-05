import { StatusCodes } from "http-status-codes";
import imageModel from "../models/image.model.js";
import { uploads } from "../config/cloudinary.config.js";

// Add an image to cloudinary and mongoDB
const createImage = async (req, res) => {
  let imageDetails = {
    imageName: req.files[0].originalname,
  };

  imageModel.find({ imageName: imageDetails.imageName }, (err) => {
    if (err) {
      res.json({
        err: err,
        message: `There was a problem creating the image because: ${err.message}`,
      });
    } else {
      let attempt = {
        imageName: req.files[0].originalname,
        imageUrl: req.files[0].path,
        imageId: "",
      };
      uploads(attempt.imageUrl).then((result) => {
        let imageDetails = {
          imageName: req.files[0].originalname,
          imageUrl: result.url,
          imageId: result.id,
          clientId: req.body.clientId,
          clientUsername: req.body.clientUsername,
        };

        imageModel
          .create(imageDetails)
          .then((image) => {
            res.status(StatusCodes.OK).json({
              Url: image.imageUrl,
            });
          })
          .catch((error) => {
            res.json({
              success: false,
              message: `Error creating image in the database: ${error.message}`,
            });
          });
      });
    }
  });
};

// Get all images registred in mongoDB
const getAllImages = async (req, res) => {
  await imageModel
    .find({})
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      res.send(error);
    });
};

// Get image by id
const getImageById = async (req, res) => {
  await imageModel
    .find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      res.send(error);
    });
};

export { createImage, getAllImages, getImageById };
