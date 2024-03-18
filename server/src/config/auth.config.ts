import { createSecretKey } from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const JWT_ISSUER = process.env.JWT_ISSUER as string
const JWT_AUDIENCE = '*'
const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRATION = '1 week'
const JWT_SECRET_KEY = createSecretKey(JWT_SECRET as string, 'utf-8')

export { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET, JWT_EXPIRATION, JWT_SECRET_KEY }
