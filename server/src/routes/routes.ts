import express from "express";
import usersRoutes from "./utilisateur.route";
import authRoutes from "./auth.route";
import posteRoute from "./poste.route";

import {
  getUsername,
  verifyAuthentication,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/", authRoutes);
router.use("/user", getUsername, verifyAuthentication, usersRoutes);
router.use("/poste", posteRoute);

export default router;
