import { register, login, updateUser } from "../controllers/auth.controller.js";

import express from "express";
const UserRouter = express.Router();

UserRouter.route("/register").post(register);
UserRouter.route("/login").post(login);
UserRouter.route("/updateUser/:userId").patch(updateUser);

export default UserRouter;
