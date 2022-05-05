import {
  CreateSettings,
  getSettings,
  updateSettings,
} from "../controllers/Settings.controller.js";

import express from "express";
const SettingsRouter = express.Router();

SettingsRouter.route("/Settings/CreateSettings").post(CreateSettings);
SettingsRouter.route("/Settings").get(getSettings);
SettingsRouter.route("/Settings/updateSettings").patch(updateSettings);

export default SettingsRouter;
