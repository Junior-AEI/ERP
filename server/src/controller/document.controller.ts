import { Request, Response } from "express";
import multer, { Multer } from "multer";

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, "../uploads");
    },
    filename: function (req: Request, file: any, cb: any) {
        cb(null, file.originalname);
    },
});

const upload: Multer = multer({ storage: storage });

const documentController = {
    uploadDocument,
};

async function uploadDocument(req: Request, res: Response) {
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
}

export default documentController;
