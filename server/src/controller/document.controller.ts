import { Request, Response } from "express";
import { Fichier } from "../models/fichier.model";
import { sequelize } from "../config/database.config";
import { Document } from "../models/document.model";
import { controllerErrorHandler } from "./utils.controller";

const documentController = {
    createDocument,
    uploadNewVersion,
    getAllDocuments,
    downloadFileById,
};

async function createDocument(req: Request, res: Response) {
    await Document.create({
        nom: req.body.nom,
    })
        .then((doc) => res.json({ id: doc.id }))
        .catch((err) => controllerErrorHandler(err, res));
}

async function uploadNewVersion(req: Request, res: Response) {
    if (!req.file || req.file === undefined) {
        res.status(500).json({
            status: 500,
            message: "Error! in file upload.",
        });
    } else {
        sequelize
            .transaction()
            .then(() => Document.findByPk(req.params.id))
            .then((doc) => {
                if (doc === null) {
                    throw new Error("Document not found");
                } else {
                    return doc;
                }
            })
            .then(async (doc) => {
                const file = req.file || { path: "" };
                let version = await Fichier.create({
                    chemin: file.path,
                    documentId: doc.id,
                    statut: req.params.statut,
                });
                return { doc, version };
            })
            .then((input: { doc: Document; version: Fichier }) => {
                input.doc.$add("version", input.version);
                return input.doc;
            })
            .then((doc) => {
                doc.changed("updatedAt", true);
                return doc.update({ updatedAt: new Date() });
            })
            .then(() => res.status(200).json("File uploaded successfully"))
            .catch((err) => controllerErrorHandler(err, res));
    }
}

async function downloadFileById(req: Request, res: Response) {
    await Fichier.findByPk(req.params.id, { include: Document })
        .then((file: Fichier | null) => {
            if (file === null) {
                throw new Error("File not found");
            } else {
                res.download(
                    __dirname + "/../../" + file.chemin,
                    file.document.nom + ".pdf"
                );
            }
        })
        .catch((err) => controllerErrorHandler(err, res));
}

async function getAllDocuments(req: Request, res: Response) {
    await Document.findAll({
        include: {
            model: Fichier,
            separate: true,
            order: [["createdAt", "DESC"]],
        },
        order: [["updatedAt", "DESC"]],
    })
        .then((docs) => res.status(200).json(docs))
        .catch((err) => controllerErrorHandler(err, res));
}
export default documentController;
