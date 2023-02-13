import express from "express";
import usersRoutes from "./users.route";
import authRoutes from "./auth.route";
import testRoutes from "./test.route";
import {
  getUsername,
  verifyAuthentication,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/", authRoutes);
router.use("/user", getUsername, verifyAuthentication, usersRoutes);
router.use("/test", testRoutes);

export default router;
