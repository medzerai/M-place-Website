import {
  addFilter,
  getAllFilters,
  getFilterById,
  updateFilter,
  deleteFilter,
  addVariablesToFilter,
  deleteVariablesFromFilter,
} from "../controllers/filter.controller.js";

import express from "express";
const FilterRouter = express.Router();

FilterRouter.route("/addFilter").post(addFilter);
FilterRouter.route("/filters").get(getAllFilters);
FilterRouter.route("/filters/:id")
  .get(getFilterById)
  .patch(updateFilter)
  .delete(deleteFilter);
FilterRouter.route("/filters/addVariablesToFilter/:id").patch(
  addVariablesToFilter
);
FilterRouter.route("/filters/deleteVariablesFromFilter/:id").patch(
  deleteVariablesFromFilter
);
export default FilterRouter;
