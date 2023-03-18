import { createHash } from "crypto";
import { Request, Response } from "express";
import multer, { Multer } from "multer";
import { getExtension } from "mime";

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

export const upload: Multer = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Check if the file meets your requirements
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Invalid file type"));
        }
        cb(null, true);
    },
});
