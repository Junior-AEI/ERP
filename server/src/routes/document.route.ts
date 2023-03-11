import documentController from "../controller/document.controller";
import express from "express";

const router = express.Router();
router.post("/", documentController.uploadDocument);

export default router;
