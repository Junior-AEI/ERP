import express from "express";
import adresseController from "../controller/adresse.controller";

const router = express.Router();

router.get("/", adresseController.getAllAdresses);
router.get("/:id", adresseController.getAdresseById);
router.post("/", adresseController.createAdresse);
router.put("/", adresseController.updateAdresse);
router.delete("/:id", adresseController.deleteAdresseById);

export default router;
