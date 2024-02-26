// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
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




//ajout pour le bot Telegram
import axios from "axios";



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
                        // Envoi de la requête au serveur bot
                        try {
                            axios.post('http://localhost:5001/api/bot/connexion');
                        } catch (error) {
                            console.error('Erreur lors de la requête POST vers /api/bot:', error);
                        }
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
