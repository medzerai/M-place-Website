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

export const imageUpload = multer({ storage: imageStorage });
