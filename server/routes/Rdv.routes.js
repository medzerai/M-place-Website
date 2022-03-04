import {
  addRdv,
  getAllRdvs,
  getRdvById,
  updateRdv,
  deleteRdv,
} from "../controllers/Rdv.controller.js";

import express from "express";
const RdvRouter = express.Router();

RdvRouter.route("/addRdv").post(addRdv);
RdvRouter.route("/Rdvs").get(getAllRdvs);
RdvRouter.route("/Rdvs/:id").get(getRdvById).patch(updateRdv).delete(deleteRdv);

export default RdvRouter;
