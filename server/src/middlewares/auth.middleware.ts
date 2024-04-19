import { Request, Response } from 'express'
import { jwtVerify } from 'jose'
import { JWT_SECRET_KEY } from '../config/auth.config'
import Users from '../models/user.model'

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
            const user = await Users.findOne({
                where: {
                    username: username
                }
            })
            
            // if user then fill info, else return an error
            if (user) {
                res.locals.user = {
                    id: user.id,
                    username: user.username
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
