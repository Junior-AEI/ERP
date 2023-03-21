import { Request, Response } from "express";
import { Fichier } from "../models/fichier.model";
import { sequelize } from "../config/database.config";
import { Document } from "../models/document.model";
import { controllerErrorHandler } from "./utils.controller";

const documentController = {
    createDocument,
    uploadNewVersion,
    getAllDocuments,
};

async function createDocument(req: Request, res: Response) {
    Document.create(req.body)
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
                });
                return { doc, version };
            })
            .then((input: { doc: Document; version: Fichier }) =>
                input.doc.$add("version", input.version)
            )
            .then(() => res.status(200).json("File uploaded successfully"))
            .catch((err) => controllerErrorHandler(err, res));
    }
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
