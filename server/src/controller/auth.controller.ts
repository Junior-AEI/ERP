// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOletD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOletD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import { SignJWT } from 'jose'
import bcrypt from 'bcrypt'
import { JWT_AUDIENCE, JWT_EXPIRATION, JWT_ISSUER, JWT_SECRET_KEY } from '../config/auth.config'
import Users from '../models/user.model'
import Tokens from '../models/token.model'
import Members from '../models/member.model'
import { promisify } from 'util'
import { controllerErrorHandler } from './utils.controller'
import { HttpError } from 'http-errors'
import Persons from '../models/person.model'

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
 */
const login = async (req: Request, res: Response) => {

    try {

        // Retrieve username and password from request body
        const username = req.body.username || '';
        const password = req.body.password || '';

        // Find user in the database
        const user = await Users.findOne({
            where: { username: username },
            include: [
                {
                    model: Members,
                    include: [
                        {
                            model: Persons,
                            attributes: ['firstname', 'lastname']
                        }
                    ]
                }
            ]
        });

        // Return error if user not found
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password'
            })
        }

        // Compare passwords
        const match = await promisify(bcrypt.compare)(password, user.password)

        // Return error if password doesn't match
        if (!match) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password'
            })
        }

        // Create JWT token
        const token = await new SignJWT({ username })
            .setProtectedHeader({ alg: 'HS256' })
            .setAudience(JWT_AUDIENCE)
            .setIssuer(JWT_ISSUER)
            .setExpirationTime(JWT_EXPIRATION)
            .sign(JWT_SECRET_KEY);

        console.log(user);

        // Return success with token and user details
        return res.status(200).json({
            status: 'success',
            data: {
                userId: user.userId,
                username: user.username,
                firstName: user.member.person.firstname,
                lastName: user.member.person.lastname,
                token: token
            }
        });
        
    } catch (err) {

        // Handle errors
        if (err instanceof HttpError) {
            return controllerErrorHandler(err, res)
        }
        throw err
        
    }

}

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
        const username = req.body.username || ''

        // Find user in the database
        const user = await Users.findOne({
            where: {
                username: username
            }
        })

        // Function to generate random token
        const generateToken = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let token = ''
            for (let i = 0; i < 64; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length)
                token += characters.charAt(randomIndex)
            }
            return token
        }

        // If user is found, generate a random token

        if (user) {

            const _token = generateToken()
            const currentDate = new Date()
            const tenMinutesLater = new Date(currentDate.getTime() + 10 * 60000)

            await Tokens.create({
                token: _token,
                validity: tenMinutesLater,
                userId: user.userId
            })

            // TODO: Send an email with a link

            // Return success response
            return res.status(200).json({
                status: 'success',
                data: {
                    token: _token
                }
            });

        } else {

            // Return error response if user not found
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });

        }

    } catch (err) {

        // Handle errors
        if (err instanceof HttpError) {
            return controllerErrorHandler(err, res)
        }
        throw err

    }
}

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
        const _newPassword = req.body.password || ''
        const _token = req.body.token || ''

        const foundToken = await Tokens.findOne({
            where: {
                token: _token
            }
        })

        if (!foundToken) throw new Error('Unable to find the provided token')

        if (foundToken.validity <= new Date()) throw new Error('Link is expired')

        // TODO : Check password before insertion ?

        const hashedPassword = await bcrypt.hash(_newPassword, 10);

        const updatedUserPassword = {
            password: hashedPassword
        }

        await Users.update(updatedUserPassword, {
            where: {
                userId: foundToken.userId
            }
        })

        // Return success response
        return res.status(200).json({
            status: 'success'
        });

    } catch (err) {
        // Handle errors
        if (err instanceof HttpError) {
            return controllerErrorHandler(err, res)
        }
        throw err
    }
}

const authController = {
    login,
    forgetPassword,
    askNewPassword
}

export default authController
