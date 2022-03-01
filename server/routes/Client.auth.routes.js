import {
  register,
  login,
  updateClient,
} from "../controllers/Client.auth.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const ClientRouter = express.Router();

ClientRouter.route("/Client/register").post(register);
ClientRouter.route("/Client/login").post(login);
ClientRouter.route("/Client/update").patch(auth, updateClient);

export default ClientRouter;
