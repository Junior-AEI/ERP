import express from "express";
import poleController from "../controller/pole.controller";

const router = express.Router();

router.get("/:nom", poleController.getPoleByName);
router.get("/", poleController.getAllPoles);
router.post("/", poleController.createPole);
router.delete("/:nom", poleController.deletePoste);

export default router;
