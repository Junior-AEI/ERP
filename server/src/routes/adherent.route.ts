import express from "express";
import adherentController from "../controller/adherent.controller";
import { verifyPermission } from "../middlewares/permission.middleware";

const router = express.Router();

router.get("/", adherentController.getAllAdherents);
router.get("/:id", adherentController.getAdherentById);
router.post(
    "/",
    verifyPermission("createAdherent"),
    adherentController.createAdherent
);
router.put("/", adherentController.updateAdherent);
router.delete("/:id", adherentController.deleteAdherentById);

export default router;
