import {
  login,
  logout,
  resetPassword,
  refreshToken,
} from "../controllers/Admin.auth.controller.js";
import express from "express";
// import auth from "../middleware/authenticateAdmin.js";
const AdminRouter = express.Router();

AdminRouter.route("/Admin/login").post(login);
AdminRouter.route("/Admin/logout").post(logout);
AdminRouter.route("/Admin/refreshToken").post(refreshToken);
AdminRouter.route("/Admin/resetPassword").post(resetPassword);

export default AdminRouter;
