import express from "express";
import {commandeConfirmation} from "../controllers/commandeController.js";

const routeCommande = express.router()
routeCommande.post("/", commandeConfirmation);
export default routeCommande;