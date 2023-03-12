import { Request, Response } from "express";
import { Pole } from "../models/pole.model";
import { controllerErrorHandler } from "./utils.controller";
import createHttpError from "http-errors";

const poleController = {
    getAllPoles,
    getPoleByName,
    createPole,
    deletePoste,
};

async function checkEmptyName(name: string) {
    if (name === "" || name === undefined || name === null) {
        throw createHttpError(400, "Empty name provided");
    }
}
async function getAllPoles(req: Request, res: Response) {
    await Pole.findAll()
        .then((poles) => res.status(200).json(poles))
        .catch((err) => controllerErrorHandler(err, res));
}

async function getPoleByName(req: Request, res: Response) {
    await Pole.findByPk(req.params.nom)
        .then((pole) => {
            if (pole === null)
                res.status(404).json({ message: "Pole not found" });
            else res.status(200).json(pole);
        })
        .catch((err) => controllerErrorHandler(err, res));
}

async function createPole(req: Request, res: Response) {
    await checkEmptyName(req.body.nom)
        .then(() => {
            req.body.createdAt = null;
            req.body.updatedAt = null;
            return Pole.create(req.body);
        })
        .then((pole) => res.status(201).json({ nom: pole.nom }))
        .catch((err) => controllerErrorHandler(err, res));
}

async function deletePoste(req: Request, res: Response) {
    await checkEmptyName(req.params.nom)
        .then(() => Pole.destroy({ where: { nom: req.params.nom } }))
        .then((deleted) => {
            if (deleted === 0)
                res.status(404).json({ message: "Pole not found" });
            else
                res.status(200).json({
                    message: `Pole ${req.params.nom} deleted`,
                });
        })
        .catch((err) => controllerErrorHandler(err, res));
}
export default poleController;
