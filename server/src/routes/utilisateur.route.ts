import express from "express";
import utilisateurController from "../controller/utilisateur.controller";

const router = express.Router();

router.get("/", utilisateurController.getAllUtilisateurs);
router.get("/:id", utilisateurController.getUtilisateurById);

router.post("/", utilisateurController.addUtilisateur);
router.delete("/", utilisateurController.deleteUtilisateur);

export default router;
