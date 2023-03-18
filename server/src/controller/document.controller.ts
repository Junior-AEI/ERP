import { createHash } from "crypto";
import { Request, Response } from "express";
import multer, { Multer } from "multer";
import { getExtension } from "mime";
import { controllerErrorHandler } from "./utils.controller";

const basedir = "database/documents";

const storage = multer.diskStorage({
    destination: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) {
        cb(null, basedir);
    },
    filename: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) {
        cb(
            null,
            `${createHash("sha256")
                .update(file.originalname + new Date())
                .digest("hex")}.${getExtension(file.mimetype)}`
        );
    },
});

const upload: Multer = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Check if the file meets your requirements
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Invalid file type"));
        }
        cb(null, true);
    },
});

const documentController = {
    uploadDocument,
};

async function uploadDocument(req: Request, res: Response) {
    /*const file = req.file || { buffer: "", originalname: "" };
    const hashedName = createHash("sha256").update(file.buffer).digest("hex");
    console.log(req.file);
    Document.create({
        nom: file.originalname,
        chemin: `${basedir}/${hashedName}.pdf`,
    })
        .then(() => {*/
    try {
        upload.single("file")(req, res, function (err: any) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.status(500).send(err.message);
            } else if (err) {
                // An unknown error occurred when uploading.
                res.status(500).send(err.message);
            } else {
                // Everything went fine.
                res.send("File uploaded successfully");
            }
        });
    } catch (err: any) {
        res.status(500).send(err.message);
    }
    /*})
        .catch((err) => controllerErrorHandler(err, res));*/
}

export default documentController;
