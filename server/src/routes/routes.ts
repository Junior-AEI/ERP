import express from "express";
import usersRoutes from "./users.route";
import authRoutes from "./auth.route";
import {
  getUsername,
  verifyAuthentication,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/", authRoutes);
router.use("/user", getUsername, verifyAuthentication, usersRoutes);

export default router;
