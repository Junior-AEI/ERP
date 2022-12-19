import express from "express";
import usersRoutes from "./users.route";

const router = express.Router();

//TODO: add auth middleware
router.use("/user", usersRoutes);

export default router;
