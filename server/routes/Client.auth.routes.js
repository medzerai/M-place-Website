import {
  register,
  login,
  logout,
  verifyClient,
  resetPassword,
  refreshToken,
} from "../controllers/Client.auth.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const ClientAuthRouter = express.Router();

ClientAuthRouter.route("/Client/register").post(register);
ClientAuthRouter.route("/Client/login").post(login);
ClientAuthRouter.route("/Client/logout").post(logout);
ClientAuthRouter.route("/Client/refreshToken").post(refreshToken);
ClientAuthRouter.route("/Client/resetPassword/:token").post(resetPassword);

ClientAuthRouter.route("/Client/verify/:token").get(verifyClient);

export default ClientAuthRouter;
