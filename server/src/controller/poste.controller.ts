import { Request, Response } from "express";
import { Poste } from "../models/poste.model";

const posteController = {
  getAllPostes,
  getPosteById,
};

async function getAllPostes(req: Request, res: Response) {
  await Poste.findAll().then((poste) => res.json(poste));
}

async function getPosteById(req: Request, res: Response) {
  await Poste.findByPk(req.params.id)
    .then((poste) => res.json(poste))
    .catch((err) => res.status(500).json({ error: err.message }));
}

export default posteController;
