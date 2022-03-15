import {
  register,
  login,
  logout,
  refreshToken,
  updatePO,
} from "../controllers/PO.auth.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const POAuthRouter = express.Router();

POAuthRouter.route("/PO/register").post(register);
POAuthRouter.route("/PO/login").post(login);
POAuthRouter.route("/PO/update").patch(updatePO);

export default POAuthRouter;
