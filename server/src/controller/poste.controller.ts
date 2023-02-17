import { Request, Response } from "express";
import { Poste } from "../models/poste.model";

const posteController = {
  getPoste,
};

async function getPoste(req: Request, res: Response) {
  await Poste.findAll().then((poste) => res.json(poste));
}

export default posteController;
