import express from "express";
import posteController from "../controller/poste.controller";

const router = express.Router();

router.get("/", posteController.getPoste);

export default router;
