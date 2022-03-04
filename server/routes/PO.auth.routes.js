import {
  register,
  login,
  updatePO,
} from "../controllers/PO.auth.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const AuthPORouter = express.Router();

AuthPORouter.route("PO/register").post(register);
AuthPORouter.route("PO/login").post(login);
AuthPORouter.route("PO/update").patch(auth, updatePO);

export default AuthPORouter;
