import express from "express";
import utilisateurRouter from "./utilisateur.route";
import authRoutes from "./auth.route";
import posteRoute from "./poste.route";
import adresseRoute from "./adresse.route";

import {
  getUsername,
  verifyAuthentication,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/", authRoutes);
// TODO : RE-enable and setup all authentification system
//router.use("/user", getUsername, verifyAuthentication, usersRoutes);
router.use("/poste", posteRoute);
router.use("/utilisateur", utilisateurRouter);
router.use("/adresse", adresseRoute);

export default router;
