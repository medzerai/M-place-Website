import { StatusCodes } from "http-status-codes";
import express from "express";
const app = express();
import "express-async-errors";

import cors from "cors";
app.use(cors());

import dotenv from "dotenv";
dotenv.config();

import db from "./server/config/mongoose.config.js";

import UserRouter from "./server/routes/auth.routes.js";

import errorHandler from "./server/middleware/error-handler.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/v1/auth", UserRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.status(StatusCodes.NOT_FOUND);
  res.send({
    error: "Not Found",
  });
});

const start = async () => {
  try {
    await db(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
