import {
  register,
  login,
  updateClient,
} from "../controllers/Client.auth.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const ClientRouter = express.Router();

ClientRouter.route("/register").post(register);
ClientRouter.route("/login").post(login);
ClientRouter.route("/updateClient").patch(auth, updateClient);

export default ClientRouter;
