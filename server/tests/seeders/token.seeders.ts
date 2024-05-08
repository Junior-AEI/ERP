import { SignJWT } from 'jose'
import Members from '../../src/models/member.model'
import Persons from '../../src/models/person.model'
import Users from '../../src/models/user.model'
import { JWT_AUDIENCE, JWT_EXPIRATION, JWT_ISSUER, JWT_SECRET_KEY } from '../../src/config/auth.config'

export const createToken = async (username: string) => {
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
    if (!user) throw new Error('Bad username')
    const token = await new SignJWT({ username }).setProtectedHeader({ alg: 'HS256' }).setAudience(JWT_AUDIENCE).setIssuer(JWT_ISSUER).setExpirationTime(JWT_EXPIRATION).sign(JWT_SECRET_KEY)
    return token
}
