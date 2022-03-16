import {
  register,
  login,
  logout,
  refreshToken,
  resetPassword,
  verifyPO,
} from "../controllers/PO.auth.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const POAuthRouter = express.Router();

POAuthRouter.route("/PO/register").post(register);
POAuthRouter.route("/PO/login").post(login);
POAuthRouter.route("/PO/logout").post(logout);
POAuthRouter.route("/PO/refreshToken").post(refreshToken);

POAuthRouter.route("/PO/resetPassword/:token").post(resetPassword);

POAuthRouter.route("/PO/verify/:token").get(verifyPO);
export default POAuthRouter;
