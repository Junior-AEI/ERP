import { describe, expect, test, beforeAll, assertType } from 'vitest'
import request from 'supertest'

interface Member {
    [key: string]: unknown
}

describe('Test `adherent` model', () => {
    let token = ''

    const adherentAttributes: string[] = [
        'id',
        'nom',
        'prenom',
        'sexe',
        'telephoneMobile',
        'email',
        'dateNaissance',
        'lieuNaissance',
        'nationalite',
        'promotion',
        'dateCotisation',
        'moyenPaiement',
        'filiere',
        'adresseId',
        'createdAt',
        'updatedAt'
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

    describe('GET / `adherent`', () => {
        test('GET / all `adherent` ', async () => {
            const response = await request(process.env.VITE_API_URL)
                .get('/adherent')
                .set('Authorization', token)

            expect(response.statusCode).toBe(200)

            response.body.forEach((ele: Member) => {
                adherentAttributes.forEach((attribute) => {
                    expect(ele).toHaveProperty(attribute)
                    expect(ele[attribute]).toBeDefined()
                })
            })
        })

        test('GET / `adherent` by id ', async () => {
            const response = await request(process.env.VITE_API_URL)
                .get('/adherent/1')
                .set('Authorization', token)

            expect(response.statusCode).toBe(200)

            adherentAttributes.forEach((attribute) => {
                expect(response.body).toHaveProperty(attribute)
                expect(response.body[attribute]).toBeDefined()
            })
        })
    })

    describe('Modify database `adherent`', () => {
        let idNewMember: number

        const newMember: Member = {
            nom: 'Antoine',
            prenom: 'Raoult',
            sexe: 'M',
            telephoneMobile: '+33614751111',
            email: 'antoine.raoult@bordeaux-inp.fr',
            dateNaissance: '2023-02-23 12:21:31.503 +00:00',
            lieuNaissance: 'Jsp',
            nationalite: 'FRA',
            promotion: '2024',
            dateCotisation: '2021-12-10T12:21:31.503Z',
            moyenPaiement: 'Lydia',
            filiere: 'Info',
            adresseId: 2
        }

        describe('POST / Create user', () => {
            test('Create new `adherent`  ', async () => {
                const response = await request(process.env.VITE_API_URL)
                    .post('/adherent')
                    .set('Authorization', token)
                    .send(newMember)

                //save id from response
                expect(response.body.id).toBeDefined()
                expect(response.body.id).not.toBeNull()
                assertType<number>(response.body.id)

                idNewMember = response.body.id

                // check response
                const checkResponse = await request(process.env.VITE_API_URL)
                    .get(`/adherent/${idNewMember}`)
                    .set('Authorization', token)

                adherentAttributes.forEach((attribute) => {
                    expect(checkResponse.body).toHaveProperty(attribute)
                    if (
                        attribute != 'id' &&
                        attribute != 'createdAt' &&
                        attribute != 'updatedAt' &&
                        attribute != 'dateNaissance'
                    ) {
                        expect(checkResponse.body[attribute]).toBe(newMember[attribute])
                    } else {
                        expect(checkResponse.body[attribute]).toBeDefined()
                        expect(checkResponse.body[attribute]).not.toBeNull()
                    }
                })

                expect(response.statusCode).toBe(201)
            })

            test('Create already existing `adherent`', async () => {
                const response = await request(process.env.VITE_API_URL)
                    .post('/adherent')
                    .set('Authorization', token)
                    .send(newMember)

                expect(response.statusCode).toBe(409)

                expect(response.body).toStrictEqual({
                    status: 409,
                    message: 'Member already exist'
                })
            })
        })

        describe('PUT / Update `adherent`', () => {
            test('Update existing `adherent`', async () => {
                const updatedMember = { ...newMember }
                // If you add a non existing field in object and send request, it seems to work, a bit strange no ?
                updatedMember.prenom = 'ManqueCruellement'
                updatedMember.id = idNewMember

                const response = await request(process.env.VITE_API_URL)
                    .put('/adherent')
                    .set('Authorization', token)
                    .send(updatedMember)

                expect(response.statusCode).toBe(204)
                // check that the modification is done with get by id
                // check that createdAt is not modified and UpdatedAt is modified
            })

            test('Update `adherent` with wrong id', async () => {
                const updatedUser = { ...newMember }
                updatedUser.id = idNewMember + 1

                const response = await request(process.env.VITE_API_URL)
                    .put('/adherent')
                    .set('Authorization', token)
                    .send(updatedUser)

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist"
                })
            })
        })

        describe('DELETE / Delete `adherent` ', () => {
            test('Delete existing `adherent`', async () => {
                const response = await request(process.env.VITE_API_URL)
                    .delete(`/adherent/${idNewMember}`)
                    .set('Authorization', token)

                expect(response.statusCode).toBe(204)

                const checkResponse = await request(process.env.VITE_API_URL)
                    .get(`/adherent/${idNewMember}`)
                    .set('Authorization', token)

                expect(checkResponse.body).toBeNull()
            })

            test('Delete already deleted `adherent`', async () => {
                const response = await request(process.env.VITE_API_URL)
                    .delete(`/adherent/${idNewMember}`)
                    .set('Authorization', token)

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist"
                })
            })
        })
    })
})
