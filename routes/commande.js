import express from "express";
import { traiterCommande } from "../controllers/commandeController.js";

const router = express.Router();

router.post("/traiterCommande", traiterCommande);

export default router;
