import { Request, Response } from 'express'
import { SignJWT } from 'jose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import { JWT_AUDIENCE, JWT_EXPIRATION, JWT_ISSUER, JWT_SECRET_KEY } from '../config/auth.config'
import Users from '../models/user.model'
import Tokens from '../models/token.model'
import Members from '../models/member.model'
import { promisify } from 'util'
import { controllerErrorHandler, sendEmail } from './utils.controller'
import createHttpError, { HttpError } from 'http-errors'
import Persons from '../models/person.model'

/**
 * Login route
 * @param req
 * @param res
 */
const login = async (req: Request, res: Response) => {
    try {
        // Retrieve username and password from request body
        const username = req.body.username || ''
        const password = req.body.password || ''

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
        })

        // Return error if user not found
        if (!user) throw createHttpError(401, 'Invalid username or password')

        // Compare passwords
        const match = await promisify(bcrypt.compare)(password, user.password)

        // Return error if password doesn't match
        if (!match) throw createHttpError(401, 'Invalid username or password')

        // Create JWT token
        const token = await new SignJWT({ username }).setProtectedHeader({ alg: 'HS256' }).setAudience(JWT_AUDIENCE).setIssuer(JWT_ISSUER).setExpirationTime(JWT_EXPIRATION).sign(JWT_SECRET_KEY)



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
        })
    } catch (err) {
        // Gestion des erreurs

        // Vous pouvez choisir de journaliser l'erreur, de retourner une réponse d'erreur, ou prendre toute autre action appropriée
        // Handle errors
        if (err instanceof HttpError) {
            return controllerErrorHandler(err, res)
        }
        throw err
    }
}

/**
 * Forget password route
 * @param req
 * @param res
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
            const person = await Persons.findOne({
                where: {
                    personId: user.userId
                }
            })
            const _token = generateToken()
            const currentDate = new Date()
            const tenMinutesLater = new Date(currentDate.getTime() + 10 * 60000)

            await Tokens.create({
                token: _token,
                validity: tenMinutesLater,
                userId: user.userId
            })

            // sendEmail(user.emailJE, "Réinitialisation Mot de Passe pour l'ERP", `Bonjour, Une demande de changement de Mot de Passe sur l'ERP a été demandé pour votre compte (nom d'utilisateur : ${user.username}) \n
            // Si vous êtes le demandeur de cette réinitialisation veuillez cliquez sur ce lien : 
            // Token à renseigner : ${_token}`)
            if (person) {
                sendEmail(person.email,"Bienvenue sur l'ERP",`Bonjour \n Le pole DSI de AEI vient de créer ton compte sur l'ERP tu peux le rejoindre en copier collant ce lien http://localhost:5173/  
                \n Voici ton identifiant  ${username} 
                \n Ton mot de passe te seras transmis par le pole DSI en personne  `)
            }

            // Return success response
            return res.status(200).json({
                status: 'success',
                data: {
                    token: _token
                }
            })
        } else {
            // Return error response if user not found
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
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
 * @param req
 * @param res
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

        if (!foundToken) throw createHttpError(401, 'Unable to find the provided token')

        if (foundToken.validity <= new Date()) throw createHttpError(401, 'Link is expired')
        const user = await Users.findOne({
            where: {
                userId: foundToken.userId
            }
        })
        // TODO : Check password before insertion ?

        const hashedPassword = await bcrypt.hash(_newPassword, 10)

        const updatedUserPassword = {
            password: hashedPassword
        }
        console.log(updatedUserPassword)
        if(user){
        await Users.update({
            userId: user.userId,
            username: user.username,
            password: updatedUserPassword.password,
            mandateStart: user.mandateStart,
            mandateEnd: user.mandateEnd,
            emailJE:user.emailJE },
            {
            where: {
                userId: user.userId
            }
        })
    }
        // Return success response
        return res.status(200).json({
            status: 'success'
        })
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
