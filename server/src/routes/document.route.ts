import documentController from "../controller/document.controller";
import express from "express";
import { upload } from "../middlewares/document.middleware";

const router = express.Router();
router.post("/", upload.single("file"), documentController.uploadDocument);

export default router;
