import { createToken } from './token.seeders'
import { createUser } from './user.seeders'

/**
 * Create the new user given in paramaters and return a valid token for this user
 * @param username
 * @return token
 */
export const initUser = async (username: string): Promise<string> => {
    await createUser(username)
    const token: string = await createToken(username)
    return token
}
