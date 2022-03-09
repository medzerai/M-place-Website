import {
  addVariable,
  getAllVariables,
  getVariableById,
  updateVariable,
  deleteVariable,
} from "../controllers/variable.controller.js";

import express from "express";
const VariableRouter = express.Router();

VariableRouter.route("/variable/addVariable").post(addVariable);
VariableRouter.route("/variables").get(getAllVariables);
VariableRouter.route("/variable/:id")
  .get(getVariableById)
  .patch(updateVariable)
  .delete(deleteVariable);

export default VariableRouter;
