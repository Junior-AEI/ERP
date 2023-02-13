import express from "express";
import userController from "../controller/user.controller";

const router = express.Router();

router.get("/", userController.getUtilisateur);
router.post("/", userController.addUtilisateur);
router.delete("/", userController.deleteUtilisateur);

export default router;
