import {
  getAllPOs,
  getPOById,
  getBlockedPOs,
  getDeletedPOs,
  verifyPO,
  approvePO,
  blockPO,
  unblockPO,
  deletePO,
  updatePO,
} from "../controllers/PO.controller.js";

import express from "express";
const PORouter = express.Router();

PORouter.route("/POs").get(getAllPOs);
PORouter.route("/bockedPOs").get(getBlockedPOs);
PORouter.route("/deletedPOs").get(getDeletedPOs);
PORouter.route("/POs/:id").get(getPOById).patch(updatePO);
PORouter.route("/POs/verify/:id").patch();
PORouter.route("/POs/approve/:id").patch();
PORouter.route("/POs/Block/:id").patch();
PORouter.route("/POs/unBlock/:id").patch();
PORouter.route("/POs/Delete/:id").patch();
PORouter.route("/POs/verify/:id").patch();
PORouter.route("/POs/approve/:id").patch();

export default PORouter;
