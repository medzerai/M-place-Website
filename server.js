import { StatusCodes } from "http-status-codes";
import express from "express";
const app = express();
import "express-async-errors";
import http from "http";
import { Server } from "socket.io";

import cors from "cors";
app.use(cors({ credentials: true, origin: "*" }));

import dotenv from "dotenv";
dotenv.config();

import db from "./server/config/mongoose.config.js";

import router from "./server/routes/index.routes.js";

import errorHandler from "./server/middleware/error-handler.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

/************************************** */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("leave_room", (data) => {
    socket.leave(data);
    console.log(`User with ID: ${socket.id} leaved room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("send message", data);

    
    //here just put the function that add the message to database
    //get id of user from the token and send id in the data
    data.author = "6229e096223ecaaf508f186c";
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
/******************************** */

app.use(router);
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
