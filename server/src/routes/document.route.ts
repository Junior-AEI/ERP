import documentController from "../controller/document.controller";
import express from "express";
import { upload } from "../middlewares/document.middleware";

const router = express.Router();
router.get("/", documentController.getAllDocuments);
router.post("/", documentController.createDocument);
router.post("/:id", upload.single("file"), documentController.uploadNewVersion);

export default router;
