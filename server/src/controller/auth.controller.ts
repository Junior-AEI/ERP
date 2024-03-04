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
import { promisify } from "util";

/**
 * Login route
 * @param req
 * @param res
 */
const login = async (req: Request, res: Response) => {
    // Get POST parameters
    const username = req.body.nomUtilisateur || "";
    const password = req.body.motDePasse || "";

    // Try to fetch user
    const user = await Utilisateur.findOne({
        where: {
            nomUtilisateur: username,
        },
    });

    // Compare passwords
    const match = await promisify(compare)(
        password,
        user ? user.motDePasse : "",
    );

    // If user not found or incorrect password then return an error
    if (!user || !match) {
        return res.status(401).json({
            status: "error",
            message: "Invalid username or password",
        });
    }

    // Create a new JWT token
    const token = await new SignJWT({ username: username })
        .setProtectedHeader({ alg: "HS256" })
        .setAudience(JWT_AUDIENCE)
        .setIssuer(JWT_ISSUER)
        .setExpirationTime(JWT_EXPIRATION)
        .sign(JWT_SECRET_KEY);

    // Return ok
    return res.status(200).json({
        status: "success",
        token: token,
        adherent_id: user.adherentId,
        utilisateur_id: user.id,
    });
};

/**
 * Forget password route
 * @param req
 * @param res
 * @returns
 */
const forgetPassword = async (req, res) => {
    // Get POST parameters
    const username = req.body.nomUtilisateur || "";

    // Try to fetch user
    const user = await Utilisateur.findOne({
        where: {
            nomUtilisateur: username,
        },
    });

    function generateToken() {
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var key = "";
        for (var i = 0; i < 16; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            key += characters.charAt(randomIndex);
        }
        return key;
    }

    // If user found then generate a random token
    if (user) {
        const token = generateToken();

        // Here TODO : Add token to DB with validity time and link to the user
        // Here TODO : Send an email with a link
    }

    // Return ok
    return res.status(200).json({
        status: "success",
    });
};

const authController = {
    login,
    forgetPassword,
};

export default authController;
