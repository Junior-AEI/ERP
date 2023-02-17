import express from "express";
import posteController from "../controller/poste.controller";

const router = express.Router();

router.get("/:id", posteController.getPosteById);
router.get("/", posteController.getAllPostes);

export default router;
