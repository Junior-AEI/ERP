import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import Clients from '../src/models/client.model'
import { initUser } from './seeders/general'
import { clients } from './seeders/data/clients.data'
import { createClient, createPerson } from './seeders/client.seeders'
import { createCompany } from './seeders/company.seeders'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/client (Get all clients)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createClient('johnny.doe')
        await createClient('jane.doe')

        const res = await request(app).get('/api/client').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.clients.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.clients[i].clientId).toBeDefined()
            expect(res.body.data.clients[i].function).toBeDefined()
            expect(res.body.data.clients[i].companyId).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/client/:clientId (Get a specific client)', () => {
    afterEach(clearDatabase)

    it('Wrong format', async () => {
        const token = await initUser('john.doe')

        const wrongFormatIdList = [null, undefined, 'wrongId']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app).get(`/api/client/${wrongFormatId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong clientId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/client/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        await createClient('johnny.doe')
        await createClient('jane.doe')

        const token = await initUser('john.doe')

        const client = await Clients.findOne({
            where: {
                function: 'RH'
            }
        })

        const res = await request(app).get(`/api/client/${client?.clientId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.client).toBeDefined()
        expect(res.body.data.client.clientId).toEqual(client?.clientId)
        expect(res.body.data.client.function).toEqual(client?.function)
        expect(res.body.data.client.companyId).toEqual(client?.companyId)
    })
})

// ! DONE
describe('ROUTE (POST): /api/client (Create new client)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        function: 'Directeur'
    }

    it('Wrong format personId', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')

        const wrongFormatIdList = [null, undefined, 'Id']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post('/api/client')
                .send({
                    client: {
                        clientId: wrongFormatId,
                        companyId: companyId,
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong personId', async () => {
        const token = await initUser('john.doe')
        const companyId = await createCompany('Enseirb')

        const res = await request(app)
            .post('/api/client')
            .send({
                client: {
                    clientId: -10,
                    companyId: companyId,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong format companyId', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')

        const wrongFormatIdList = [null, undefined, 'Id']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post('/api/client')
                .send({
                    client: {
                        clientId: clientId,
                        companyId: wrongFormatId,
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong companyId', async () => {
        const token = await initUser('john.doe')
        const clientId = await createClient('johnny.doe')

        const res = await request(app)
            .post('/api/client')
            .send({
                client: {
                    clientId: clientId,
                    companyId: -10,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong function', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Matmeca')
        const clientId = await createClient('johnny.doe')

        const wrongFunctionList = ['', null, undefined, 'FunctionToooo' + 'o'.repeat(40) + 'oLong']

        for (const wrongFunction of wrongFunctionList) {
            const res = await request(app)
                .post('/api/client')
                .send({
                    client: {
                        clientId: clientId,
                        companyId: companyId,
                        function: wrongFunction
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')
        const personId = await createPerson('johnny.doe')

        const res = await request(app)
            .post('/api/client')
            .send({
                client: {
                    clientId: personId,
                    companyId: companyId,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.clientId).toBeDefined()

        const client = await Clients.findOne({
            where: {
                clientId: res.body.data.clientId
            }
        })

        expect(client?.companyId).toEqual(companyId)
        expect(client?.clientId).toEqual(res.body.data.clientId)
        expect(client?.function).toEqual(goodParams.function)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/client/:id (Update client)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        function: 'Directeur'
    }

    it('Wrong format clientId', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Matmeca')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/client/${wrongParam}`)
                .send({
                    client: {
                        companyId: companyId,
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong clientId', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Matmeca')

        const res = await request(app)
            .put(`/api/client/${-10}`)
            .send({
                client: {
                    companyId: companyId,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong format companyId', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')

        const wrongParamList = [null, undefined, 'wrongCompanyIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/client/${clientId}`)
                .send({
                    client: {
                        companyId: wrongParam,
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong companyId', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')

        const res = await request(app)
            .put(`/api/client/${clientId}`)
            .send({
                client: {
                    companyId: -10,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong function', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Matmeca')
        const clientId = await createClient('johnny.doe')

        const wrongFunctionList = ['', null, undefined, 'FunctionToooo' + 'o'.repeat(40) + 'oLong', 19]

        for (const wrongFunction of wrongFunctionList) {
            const res = await request(app)
                .put(`/api/client/${clientId}`)
                .send({
                    client: {
                        companyId: companyId,
                        function: wrongFunction
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')
        const companyId = await createCompany('Matmeca')

        const client = await Clients.findOne({
            where: {
                clientId: clientId
            }
        })

        expect(client?.clientId).toEqual(clientId)
        expect(client?.function).toEqual(clients['johnny.doe'].function)

        const res = await request(app)
            .put(`/api/client/${clientId}`)
            .send({
                client: {
                    ...goodParams,
                    companyId: companyId
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedClient = await Clients.findOne({
            where: {
                clientId: clientId
            }
        })

        expect(updatedClient?.clientId).toEqual(clientId)
        expect(updatedClient?.companyId).toEqual(companyId)
        expect(updatedClient?.function).toEqual(goodParams['function'])
    })
})

// ! DONE
describe('ROUTE (DELETE): /api/client/:id (Delete client)', () => {
    afterEach(clearDatabase)

    it('Wrong format clientId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/client/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong clientId (client not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/client/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')

        const client = await Clients.findOne({
            where: {
                clientId: clientId
            }
        })

        expect(client).toBeTruthy()

        const res = await request(app).delete(`/api/client/${clientId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedClient = await Clients.findOne({
            where: {
                clientId: clientId
            }
        })

        expect(deletedClient).not.toBeTruthy()
    })
})
