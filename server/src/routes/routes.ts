import express from "express";
import utilisateurRouter from "./utilisateur.route";
import authRoutes from "./auth.route";
import posteRoute from "./poste.route";
import poleRoute from "./pole.route";
import adresseRoute from "./adresse.route";
import adherentRoute from "./adherent.route";
import entrepriseRoute from "./entreprise.route";
import clientRoute from "./client.route";
import documentRouter from "./document.route";

import {
    getUsername,
    verifyAuthentication,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.use(authRoutes);
router.use("/pole", getUsername, verifyAuthentication, poleRoute);
router.use("/poste", getUsername, verifyAuthentication, posteRoute);
router.use(
    "/utilisateur",
    getUsername,
    verifyAuthentication,
    utilisateurRouter
);
router.use("/adresse", getUsername, verifyAuthentication, adresseRoute);
router.use("/adherent", getUsername, verifyAuthentication, adherentRoute);
router.use("/entreprise", getUsername, verifyAuthentication, entrepriseRoute);
router.use("/client", getUsername, verifyAuthentication, clientRoute);
router.use("/document", getUsername, verifyAuthentication, documentRouter);
export default router;
