import express from "express";
import adherentController from "../controller/adherent.controller";

const router = express.Router();

router.get("/", adherentController.getAllAdherents);
router.get("/:id", adherentController.getAdherentById);
router.post("/", adherentController.createAdherent);
router.put("/", adherentController.updateAdherent);
router.delete("/:id", adherentController.deleteAdherentById);

export default router;
