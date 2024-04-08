import { describe, expect, test, beforeAll, assertType } from 'vitest'
import request from 'supertest'

interface Customer {
    [key: string]: unknown
}

describe('Test `client` model', () => {
    let token = ''

    const clientAttributes: string[] = ['id', 'nom', 'prenom', 'sexe', 'telephoneMobile', 'email', 'fonction', 'telephoneFixe', 'entrepriseId', 'createdAt', 'updatedAt']

    //get token for request
    beforeAll(async () => {
        const pres = {
            nomUtilisateur: 'lorene.marques',
            motDePasse: 'unmotdepassesuperfort'
        }
        const response = await request(process.env.VITE_API_URL).post('/login').send(pres)
        token = 'Bearer ' + response.body.token
    })

    describe('GET / `client`', () => {
        test('GET / all `client` ', async () => {
            const response = await request(process.env.VITE_API_URL).get('/client').set('Authorization', token)

            expect(response.statusCode).toBe(200)

            response.body.forEach((ele: Customer) => {
                clientAttributes.forEach(attribute => {
                    expect(ele).toHaveProperty(attribute)
                    expect(ele[attribute]).toBeDefined()
                })
            })
        })

        test('GET / `client` by id ', async () => {
            const response = await request(process.env.VITE_API_URL).get('/client/1').set('Authorization', token)

            expect(response.statusCode).toBe(200)

            clientAttributes.forEach(attribute => {
                expect(response.body).toHaveProperty(attribute)
                expect(response.body[attribute]).toBeDefined()
            })
        })
    })

    describe('Modify database `client`', () => {
        let idNewCustomer: number

        const newCustomer: Customer = {
            nom: 'Antoine',
            prenom: 'Raoult',
            sexe: 'M',
            telephoneMobile: '+33614751111',
            email: 'antoine.raoult@bordeaux-inp.fr',
            fonction: 'PDG',
            telephoneFixe: '+33614751112',
            entrepriseId: 1
        }

        describe('POST / Create customer', () => {
            test('Create new `client`  ', async () => {
                const response = await request(process.env.VITE_API_URL).post('/client').set('Authorization', token).send(newCustomer)

                //save id from response
                expect(response.body.id).toBeDefined()
                expect(response.body.id).not.toBeNull()
                assertType<number>(response.body.id)

                idNewCustomer = response.body.id

                // check response
                const checkResponse = await request(process.env.VITE_API_URL).get(`/client/${idNewCustomer}`).set('Authorization', token)

                clientAttributes.forEach(attribute => {
                    expect(checkResponse.body).toHaveProperty(attribute)
                    if (attribute != 'id' && attribute != 'createdAt' && attribute != 'updatedAt') {
                        expect(checkResponse.body[attribute]).toBe(newCustomer[attribute])
                    } else {
                        expect(checkResponse.body[attribute]).toBeDefined()
                        expect(checkResponse.body[attribute]).not.toBeNull()
                    }
                })

                expect(response.statusCode).toBe(201)
            })

            test('Create already existing `client`', async () => {
                const response = await request(process.env.VITE_API_URL).post('/client').set('Authorization', token).send(newCustomer)

                expect(response.statusCode).toBe(409)

                expect(response.body).toStrictEqual({
                    status: 409,
                    message: 'Customer already exist'
                })
            })
        })

        describe('PUT / Update `client`', () => {
            test('Update existing `client`', async () => {
                const updatedCustomer = { ...newCustomer }
                // If you add a non existing field in object and send request, it seems to work, a bit strange no ?
                updatedCustomer.prenom = 'ManqueCruellement'
                updatedCustomer.id = idNewCustomer

                const response = await request(process.env.VITE_API_URL).put('/client').set('Authorization', token).send(updatedCustomer)

                expect(response.statusCode).toBe(204)
                // check that the modification is done with get by id
                // check that createdAt is not modified and UpdatedAt is modified
            })

            test('Update `client` with wrong id', async () => {
                const updatedCustomer = { ...newCustomer }
                updatedCustomer.id = idNewCustomer + 1

                const response = await request(process.env.VITE_API_URL).put('/client').set('Authorization', token).send(updatedCustomer)

                expect(response.statusCode).toBe(404)

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist"
                })
            })
        })

        describe('DELETE / Delete `client` ', () => {
            test('Delete existing `client`', async () => {
                const response = await request(process.env.VITE_API_URL).delete(`/client/${idNewCustomer}`).set('Authorization', token)

                expect(response.statusCode).toBe(204)

                const checkResponse = await request(process.env.VITE_API_URL).get(`/client/${idNewCustomer}`).set('Authorization', token)

                expect(checkResponse.body).toBeNull()
            })

            test('Delete already deleted `client`', async () => {
                const response = await request(process.env.VITE_API_URL).delete(`/client/${idNewCustomer}`).set('Authorization', token)

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist"
                })
            })
        })
    })
})
