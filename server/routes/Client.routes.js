import {
  updateClient,
  getAllClient,
  getVerifiedClients,
  getNoneVerifiedClients,
} from "../controllers/Client.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const ClientRouter = express.Router();

ClientRouter.route("/Client/update").patch(auth, updateClient);

ClientRouter.route("/Clients").get(auth, getAllClient);

ClientRouter.route("/Client/Verified").get(auth, getVerifiedClients);

ClientRouter.route("/Client/NoneVerified").get(auth, getNoneVerifiedClients);

export default ClientRouter;
