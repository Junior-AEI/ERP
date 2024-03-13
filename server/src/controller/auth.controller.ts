// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOletD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOletD
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
import Adherent from "../models/member.model";
import { promisify } from "util";
import { controllerErrorHandler } from "./utils.controller";

// Functions in this controller :
// For the routes
//      login, // Verify the login informations of a member
//      forgetPassword, // Send an email with informations to ask a new Password
//      askNewPassword, // Modify the password if you have a valid token

/**
 * Login route
 * @param req
 * @param res :
 *  -200 success with all the usefull data
 *  -401 Unauthorized because of invalid username or password.
 *
 */

const login = async (req: Request, res: Response) => {
    try {
        // Retrieve username and password from request body
        const username = req.body.username || "";
        const password = req.body.password || "";

        // Find user in the database
        const user = await Utilisateur.findOne({
            where: { nomUtilisateur: username },
            include: [
                {
                    model: Adherent,
                    attributes: ["nom", "prenom"],
                },
            ],
        });

        // Return error if user not found
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Invalid username or password",
            });
        }

        // Compare passwords
        const match = await promisify(compare)(password, user.motDePasse);

        // Return error if password doesn't match
        if (!match) {
            return res.status(401).json({
                status: "error",
                message: "Invalid username or password",
            });
        }

        // Create JWT token
        const token = await new SignJWT({ username })
            .setProtectedHeader({ alg: "HS256" })
            .setAudience(JWT_AUDIENCE)
            .setIssuer(JWT_ISSUER)
            .setExpirationTime(JWT_EXPIRATION)
            .sign(JWT_SECRET_KEY);

        // Return success with token and user details
        return res.status(200).json({
            status: "success",
            userId: user.id,
            memberId: user.adherentId,
            username: user.nomUtilisateur,
            firstName: user.adherent.prenom,
            lastName: user.adherent.nom,
            token,
        });
    } catch (err: any) {
        // Handle errors
        controllerErrorHandler(err, res);
    }
};

// A FINIR //

/**
 * Forget password route
 * If the username is valid send a email with a token
 * @param req
 * @param res
 * @returns
 */
const forgetPassword = async (req: Request, res: Response) => {
    try {
        // Get username from request body
        const username = req.body.nomUtilisateur || "";

        // Find user in the database
        const user = await Utilisateur.findOne({
            where: {
                nomUtilisateur: username,
            },
        });

        // Function to generate random token
        const generateToken = () => {
            const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let token = "";
            for (let i = 0; i < 16; i++) {
                const randomIndex = Math.floor(
                    Math.random() * characters.length,
                );
                token += characters.charAt(randomIndex);
            }
            return token;
        };

        // If user is found, generate a random token
        if (user) {
            const token = generateToken();

            // TODO: Add token to database with validity time and link to the user
            // TODO: Send an email with a link

            // Return success response
            return res.status(200).json({
                status: "success",
            });
        } else {
            // Return error response if user not found
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
    } catch (err: any) {
        // Handle errors
        controllerErrorHandler(err, res);
    }
};

/**
 * Ask New Password route
 * Verify if token is valid and modify password in DB
 * NEED TO FINISH
 * @param req
 * @param res
 * @returns
 */

const askNewPassword = async (req: Request, res: Response) => {
    try {
        // Get new password and token from request body
        const newPassword = req.body.password || "";
        const token = req.body.token || "";

        // TODO: Here, check the validity of the token in the database and get the linked user
        // TODO: Declare a new password in the database for the linked user

        // Return success response
        return res.status(200).json({
            status: "success",
        });
    } catch (err: any) {
        // Handle errors
        controllerErrorHandler(err, res);
    }
};

// A FINIR OU A SUPPRIMER //
const logout = async (req: Request, res: Response) => {
    // Get POST parameters
    const token = req.body.token || "";
};

const authController = {
    login,
    forgetPassword,
    askNewPassword,
};

export default authController;
