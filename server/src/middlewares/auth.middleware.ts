// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
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
