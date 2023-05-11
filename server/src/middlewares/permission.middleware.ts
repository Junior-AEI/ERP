import { Request, Response } from "express";
import Permission from "../models/permission.model";

function verifyPermission(nomPermission: string) {
    return async (req: Request, res: Response, next: () => void) => {
        console.log("id", res.locals.user.id);
        const perm = await Permission.findOne({
            where: {
                nomPermission: nomPermission,
                idUtilisateur: res.locals.user.id,
            },
        });
        console.log(res.locals.user);
        if (perm) {
            next();
        } else {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
        }
    };
}

export { verifyPermission };
