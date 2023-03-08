import express from "express";
import entrepriseController from "../controller/entreprise.controller";

const router = express.Router();

router.get("/", entrepriseController.getAllEntreprises);
router.get("/:id", entrepriseController.getEntrepriseById);
router.post("/", entrepriseController.createEntreprise);
router.put("/", entrepriseController.updateEntreprise);
router.delete("/:id", entrepriseController.deleteEntrepriseById);

export default router;
