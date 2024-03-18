import { describe, expect, test, beforeAll, assertType } from 'vitest'
import request from 'supertest'

interface User {
    [key: string]: unknown
}

describe('Test `utilisateur` model', () => {
    let token = ''

    const utilisateurAttributes: string[] = [
        'id',
        'nomUtilisateur',
        'derniereConnexion',
        'estActif',
        'debutMandat',
        'finMandat',
        'mailJE',
        'posteId',
        'createdAt',
        'updatedAt',
        'adherentId'
    ]

    //get token for request
    beforeAll(async () => {
        const pres = {
            nomUtilisateur: 'lorene.marques',
            motDePasse: 'unmotdepassesuperfort'
        }
        const response = await request(process.env.VITE_API_URL).post('/login').send(pres)
        token = 'Bearer ' + response.body.token
    })

    describe('GET / user', () => {
        test('GET / all `utilisateur` ', async () => {
            const response = await request(process.env.VITE_API_URL)
                .get('/utilisateur')
                .set('Authorization', token)

            expect(response.statusCode).toBe(200)

            response.body.forEach((ele: User) => {
                utilisateurAttributes.forEach((attribute) => {
                    expect(ele).toHaveProperty(attribute)
                    expect(ele[attribute]).toBeDefined()
                    expect(ele[attribute]).not.toBeNull()
                })
            })
        })

        test('GET / `utilisateur` by id ', async () => {
            const response = await request(process.env.VITE_API_URL)
                .get('/utilisateur/1')
                .set('Authorization', token)

            expect(response.statusCode).toBe(200)

            utilisateurAttributes.forEach((attribute) => {
                expect(response.body).toHaveProperty(attribute)
                expect(response.body[attribute]).toBeDefined()
                expect(response.body[attribute]).not.toBeNull()
            })
        })
    })

    describe('Modify database `utilisateur`', () => {
        let idNewUser: number

        const newUser: User = {
            nomUtilisateur: 'marine.vovard',
            derniereConnexion: '1970-01-01T00:00:00.000Z',
            motDePasse: 'azerty',
            estActif: true,
            mailJE: 'marine.vovard@dfvgbrzgteafv.cd',
            posteId: 2,
            debutMandat: '2022-04-01T00:00:00.000Z',
            finMandat: '2023-03-31T22:59:59.000Z',
            adherentId: 1
        }

        describe('POST / Create user', () => {
            test('Create new `utilisateur`  ', async () => {
                const response = await request(process.env.VITE_API_URL)
                    .post('/utilisateur')
                    .set('Authorization', token)
                    .send(newUser)

                //save id from response
                expect(response.body.id).toBeDefined()
                expect(response.body.id).not.toBeNull()
                assertType<number>(response.body.id)

                idNewUser = response.body.id

                // check response
                const checkResponse = await request(process.env.VITE_API_URL)
                    .get(`/utilisateur/${idNewUser}`)
                    .set('Authorization', token)

                utilisateurAttributes.forEach((attribute) => {
                    expect(checkResponse.body).toHaveProperty(attribute)
                    if (
                        attribute != 'id' &&
                        attribute != 'createdAt' &&
                        attribute != 'updatedAt' &&
                        attribute != 'motDePasse'
                    ) {
                        expect(checkResponse.body[attribute]).toBe(newUser[attribute])
                    } else {
                        expect(checkResponse.body[attribute]).toBeDefined()
                        expect(checkResponse.body[attribute]).not.toBeNull()
                    }
                })
            })

            test('Add failed test, create already existing user (same user)', async () => {
                const response = await request(process.env.VITE_API_URL)
                    .post('/utilisateur')
                    .set('Authorization', token)
                    .send(newUser)

                expect(response.statusCode).toBe(409)

                expect(response.body).toStrictEqual({
                    status: 409,
                    message: 'User already exist'
                })
            })

            test('Add failed test, create already existing user (same nomUtilisateur)', async () => {
                const modifiedUser = { ...newUser }
                modifiedUser.mailJE = 'anotheremail@different.is'

                const response = await request(process.env.VITE_API_URL)
                    .post('/utilisateur')
                    .set('Authorization', token)
                    .send(modifiedUser)

                expect(response.statusCode).toBe(409)
                expect(response.body).toStrictEqual({
                    status: 409,
                    message: 'User already exist'
                })
            })

            test('Add failed test, create already existing user (same mailJE)', async () => {
                const modifiedUser = { ...newUser }
                modifiedUser.nomUtilisateur = 'another.username'

                const response = await request(process.env.VITE_API_URL)
                    .post('/utilisateur')
                    .set('Authorization', token)
                    .send(newUser)

                expect(response.statusCode).toBe(409)
                expect(response.body).toStrictEqual({
                    status: 409,
                    message: 'User already exist'
                })
            })
        })

        describe('PUT / Update `utilisateur`', () => {
            test('Update existing `utilisateur` nadjime', async () => {
                const updatedUser = { ...newUser }
                updatedUser.motDePasse = 'azertyUnPeuPlusComplique'
                updatedUser.id = idNewUser

                const response = await request(process.env.VITE_API_URL)
                    .put('/utilisateur')
                    .set('Authorization', token)
                    .send(updatedUser)

                expect(response.statusCode).toBe(204)

                // check that createdAt is not modified and UpdatedAt is modified
            })

            test('Update `utilisateur` with wrong id', async () => {
                const updatedUser = { ...newUser }
                updatedUser.id = idNewUser + 1

                const response = await request(process.env.VITE_API_URL)
                    .put('/utilisateur')
                    .set('Authorization', token)
                    .send(updatedUser)

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist"
                })
            })
        })

        describe('DELETE / Delete `utilisateur` ', () => {
            test('Delete existing `utilisateur` nadjime ', async () => {
                const response = await request(process.env.VITE_API_URL)
                    .delete(`/utilisateur/${idNewUser}`)
                    .set('Authorization', token)

                expect(response.statusCode).toBe(204)

                const checkResponse = await request(process.env.VITE_API_URL)
                    .get(`/utilisateur/${idNewUser}`)
                    .set('Authorization', token)

                expect(checkResponse.body).toBeNull()
            })

            test('Delete already deleted `utilisateur` nadjime ', async () => {
                const response = await request(process.env.VITE_API_URL)
                    .delete(`/utilisateur/${idNewUser}`)
                    .set('Authorization', token)

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist"
                })
            })
        })
    })
})
