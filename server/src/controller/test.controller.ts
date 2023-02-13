import { Request, Response } from "express";
import { Test } from "../models/test.model";
const testController = {
  getTest,
  addTest,
  deleteTest,
};

async function getTest(req: Request, res: Response) {
  await Test.findAll().then((tests) => res.json(tests));
}

async function addTest(req: Request, res: Response) {
  await Test.create({ name: req.body.name })
    .then(() => res.json(req.body.name))
    .catch((err) => res.status(500).json({ error: err.message }));
}

async function deleteTest(req: Request, res: Response) {
  await Test.destroy({ where: { name: req.body.name } })
    .then(() => res.json(req.body.name))
    .catch((err) => res.status(500).json({ error: err.message }));
}

export default testController;
