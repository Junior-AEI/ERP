// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import { jwtVerify } from 'jose'
import { JWT_SECRET_KEY } from '../config/auth.config'
import Utilisateur from '../models/utilisateur.model'

/**
 * TODO : Comment
 * @param headerValue
 * @returns
 */
const extractBearerToken = (headerValue: string) => {
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/**
 * Fill request by username if a valid token is provided
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getUsername = async (req: Request, res: Response, next: () => void) => {
    // Get token in headers
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (token) {
        // If token found
        try {
            // Try to verify token
            const { payload } = await jwtVerify(token, JWT_SECRET_KEY)

            // Extract user from token
            const username = payload.username

            // Fetch user
            const user = await Utilisateur.findOne({
                where: {
                    nomUtilisateur: username
                }
            })

            // if user then fill info, else return an error
            if (user) {
                res.locals.user = {
                    id: user.id,
                    nomUtilisateur: user.nomUtilisateur
                }

                next()
            } else {
                return res.status(401).json({
                    status: 'error',
                    message: 'Failed to fetch user'
                })
            }
        } catch (e) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid or expired token'
            })
        }
    } else {
        next()
    }
}

/**
 * Check is username is filled
 * @param req
 * @param res
 * @param next
 * @returns
 */
function verifyAuthentication(req: Request, res: Response, next: () => void) {
    if (!res.locals.user) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        })
    }
    next()
}

export { getUsername, verifyAuthentication }
