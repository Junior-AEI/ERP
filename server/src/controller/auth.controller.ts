import { Request, Response } from "express";
import { SignJWT } from "jose";
import { compare, hash } from "bcrypt";
import {
    JWT_AUDIENCE,
    JWT_EXPIRATION,
    JWT_ISSUER,
    JWT_SECRET_KEY,
} from "../config/auth.config";
import { Utilisateur } from "../models/utilisateur.model";

const authController = {
    register,
    login,
};

async function register(req: Request, res: Response) {
    await Utilisateur.findOne({
        where: { nomUtilisateur: req.body.username },
    }).then((user) => {
        if (user) {
            res.status(409).json({
                status: "error",
                message: "Username already exists",
            });
        } else {
            hash(req.body.password, 10).then((hash) => {
                Utilisateur.create({
                    nomUtilisateur: req.body.username,
                    motDePasse: hash,
                    estActive: true,
                    derniereConnexion: new Date(),
                })
                    .then(() => res.status(200).json({ status: "success" }))
                    .catch((err) =>
                        res.status(500).json({ status: "error", message: err })
                    );
            });
        }
    });
}

async function login(req: Request, res: Response) {
    const username = req.body.nomUtilisateur;
    const password = req.body.motDePasse;
    Utilisateur.findOne({ where: { nomUtilisateur: username } }).then(
        (user) => {
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
        }
    );
}

export default authController;
