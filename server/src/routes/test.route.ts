import express from "express";
import testController from "../controller/test.controller";

const router = express.Router();

router.get("/", testController.getTest);
router.post("/", testController.addTest);
router.delete("/", testController.deleteTest);

export default router;
