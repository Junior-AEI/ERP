import express from "express";
import userController from "../controller/user.controller";

const router = express.Router();

router.get("/", userController.getUser);
router.post("/", userController.addUser);
router.delete("/", userController.deleteUser);

export default router;
