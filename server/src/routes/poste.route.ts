import express from "express";
import posteController from "../controller/poste.controller";

const router = express.Router();

router.get("/:id", posteController.getPosteById);
router.get("/", posteController.getAllPostes);
router.post("/", posteController.createPoste);
router.put("/", posteController.updatePoste);
router.delete("/:id", posteController.deletePosteById);

export default router;
