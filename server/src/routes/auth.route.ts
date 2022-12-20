import express from "express";
import authController from "../controller/auth.controller";

const router = express.Router();

router.post("/login", authController.login);

export default router;
