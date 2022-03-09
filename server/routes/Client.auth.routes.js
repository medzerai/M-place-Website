import {
  register,
  login,
  logout,
  updateClient,
  verifyClient,
  resetPassword,
  getAllClient,
  refreshToken,
} from "../controllers/Client.auth.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const ClientRouter = express.Router();

ClientRouter.route("/Client/register").post(register);
ClientRouter.route("/Client/login").post(login);
ClientRouter.route("/Client/logout").post(logout);
ClientRouter.route("/Client/refreshToken").post(refreshToken);
ClientRouter.route("/Client/update").patch(auth, updateClient);

ClientRouter.route("/Client/verify/:token").get(verifyClient);

ClientRouter.route("/Clients").get(auth, getAllClient);

export default ClientRouter;
