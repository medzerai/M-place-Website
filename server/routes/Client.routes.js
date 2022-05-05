import {
  updateClient,
  getAllClient,
  getClientData,
  getClientById,
  getVerifiedClients,
  getNoneVerifiedClients,
  deleteClient,
  contactUsByMail,
} from "../controllers/Client.controller.js";
import express from "express";
import auth from "../middleware/authenticateClient.js";
const ClientRouter = express.Router();

ClientRouter.route("/Client/update").patch(auth, updateClient);

ClientRouter.route("/Client/:id").delete(deleteClient);

ClientRouter.route("/Clients").get(auth, getAllClient);

ClientRouter.route("/Client/MyData").get(getClientData);

ClientRouter.route("/Client/Verified").get(getVerifiedClients);

ClientRouter.route("/Client/NoneVerified").get(getNoneVerifiedClients);

ClientRouter.route("/Client/contactUs").post(contactUsByMail);
export default ClientRouter;
