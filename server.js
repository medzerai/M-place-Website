import express from "express";
const app = express();

// const cors = require("cors");
import cors from "cors";
app.use(cors());

import dotenv from "dotenv";
dotenv.config();

// connect DB
import connectDB from "./server/config/connectDB.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
