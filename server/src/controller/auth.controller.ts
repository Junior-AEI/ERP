import { Request, Response } from "express";
import { SignJWT } from "jose";
import { compare } from "bcrypt";
import {
    JWT_AUDIENCE,
    JWT_EXPIRATION,
    JWT_ISSUER,
    JWT_SECRET_KEY,
} from "../config/auth.config";
import Utilisateur from "../models/utilisateur.model";
import { controllerErrorHandler } from "./utils.controller";

const authController = {
    login,
};

async function login(req: Request, res: Response) {
    const username = req.body.nomUtilisateur || "";
    const password = req.body.motDePasse || "";
    Utilisateur.findOne({ where: { nomUtilisateur: username } })
        .then((user) => {
            if (user) {
                compare(password, user.motDePasse).then(async (result) => {
                    if (result) {
                        const token = await new SignJWT({ username: username })
                            .setProtectedHeader({ alg: "HS256" })
                            .setAudience(JWT_AUDIENCE)
                            .setIssuer(JWT_ISSUER)
                            .setExpirationTime(JWT_EXPIRATION)
                            .sign(JWT_SECRET_KEY);
                        return res.status(200).json({
                            status: "success",
                            token: token,
                            adherent_id: user.adherentId,
                            utilisateur_id: user.id,
                        });
                    } else {
                        return res.status(401).json({
                            status: "error",
                            message: "Invalid username or password",
                        });
                    }
                });
            } else {
                res.status(401).json({
                    status: "error",
                    message: "Invalid username or password",
                });
            }
        })
        .catch((err) => controllerErrorHandler(err, res));
}

export default authController;
