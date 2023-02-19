import express from "express";
import utlisateurRouter from "./utilisateur.route";
import authRoutes from "./auth.route";
import posteRoute from "./poste.route";

import {
  getUsername,
  verifyAuthentication,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/", authRoutes);
// TODO : RE-enable and setup all authentification system
//router.use("/user", getUsername, verifyAuthentication, usersRoutes);
router.use("/poste", posteRoute);
router.use("/utilisateur", utlisateurRouter);

export default router;
