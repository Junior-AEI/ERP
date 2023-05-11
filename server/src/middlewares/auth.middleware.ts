import { Request, Response } from "express";
import { jwtVerify } from "jose";
import {
    JWT_AUDIENCE,
    JWT_ISSUER,
    JWT_SECRET_KEY,
} from "../config/auth.config";
import Utilisateur from "../models/utilisateur.model";

function extractBearerToken(headerValue: string) {
    const matches = headerValue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
}

function getUsername(req: Request, res: Response, next: () => void) {
    const token =
        req.headers.authorization &&
        extractBearerToken(req.headers.authorization);

    if (token) {
        jwtVerify(token, JWT_SECRET_KEY, {
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
        })
            .then(async (result) => {
                const user = await Utilisateur.findOne({
                    where: {
                        nomUtilisateur: result.payload.username,
                    },
                });
                // console.log(user);
                if (user) {
                    res.locals.user = {
                        id: user.id,
                        nomUtilisateur: user.nomUtilisateur,
                    };
                    next();
                } else {
                    return res.status(401).json({
                        status: "error",
                        message: "Failed to fetch user",
                    });
                }
            })
            .catch((error) => {
                return res.status(401).json({
                    status: "error",
                    message: "Invalid token",
                });
            });
    } else {
        next();
    }
}

function verifyAuthentication(req: Request, res: Response, next: () => void) {
    if (!res.locals.user) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized gnagnagna",
        });
    }
    next();
}

export { getUsername, verifyAuthentication };
