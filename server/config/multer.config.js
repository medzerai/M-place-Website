import multer, { diskStorage } from "multer";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const imageStorage = diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(
        null,
        path.join(dirname(fileURLToPath(import.meta.url)), "../files/imgs")
      );
    } else {
      cb({ message: "This file is not an image file" }, false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileStorage = diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/x-pdf"
    ) {
      cb(
        null,
        path.join(dirname(fileURLToPath(import.meta.url)), "../files/pdf")
      );
    } else {
      cb({ message: "This file is not a pdf file" }, false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const imageUpload = multer({ storage: imageStorage });
const fileUpload = multer({ storage: fileStorage });
export { imageUpload, fileUpload };
