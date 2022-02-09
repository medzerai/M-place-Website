import { register, login, updateUser } from "../controllers/auth.controller.js";
import express from "express";
import auth from "../middleware/authenticateUser.js";
const UserRouter = express.Router();

UserRouter.route("/register").post(register);
UserRouter.route("/login").post(login);
UserRouter.route("/updateUser").patch(auth, updateUser);

export default UserRouter;
