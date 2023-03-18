import { Request, Response } from "express";
import Document from "../models/document.model";
import { controllerErrorHandler } from "./utils.controller";

const documentController = {
    uploadDocument,
};

async function uploadDocument(req: Request, res: Response) {
    if (!req.file) {
        res.status(500).json({
            status: 500,
            message: "Error! in file upload.",
        });
    } else {
        Document.create({
            nom: req.file.originalname.split(".")[0],
            chemin: req.file.path,
        })
            .then(() => res.status(200).json("File uploaded successfully"))
            .catch((err) => controllerErrorHandler(err, res));
    }
}

export default documentController;
