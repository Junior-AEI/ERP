import express from "express";
import clientController from "../controller/client.controller";

const router = express.Router();

router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);
router.post("/", clientController.createClient);
router.put("/", clientController.updateClient);
router.delete("/:id", clientController.deleteClientById);

export default router;
