import dotenv from "dotenv";
dotenv.config();

import { config, uploader } from "cloudinary";
config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploads = (file) => {
  return new Promise((resolve) => {
    uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto", folder: "E-Market/Images" }
    );
  });
};
const fileUploads = (file) => {
  return new Promise((resolve) => {
    uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto", folder: "E-Market/Files" }
    );
  });
};
export { uploads, fileUploads };
