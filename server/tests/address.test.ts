const request = require('supertest')
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase, showErrorMessage } from './utils'
import { createToken } from './seeders/token.seeders'
import { initUser } from './seeders/general'
import { characters } from './seeders/data/characters.data'
import { createdAddress } from './seeders/address.seeders'
import Addresses from '../src/models/address.model'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/address (Get all addresses)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        await initUser('john.doe')
        await createdAddress('jane.doe')

        const token = await createToken('john.doe')

        const res = await request(app).get('/api/address').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')

        expect(res.body.data.addresses.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.addresses[i].addressId).toBeDefined()
            expect(res.body.data.addresses[i].address).toBeDefined()
            expect(res.body.data.addresses[i].additionnalAddress).toBeDefined()
            expect(res.body.data.addresses[i].city).toBeDefined()
            expect(res.body.data.addresses[i].postCode).toBeDefined()
            expect(res.body.data.addresses[i].country).toBeDefined()
            expect(res.body.data.addresses[i].createdAt).toBeDefined()
            expect(res.body.data.addresses[i].updatedAt).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/address/:addressId (Get a specific address)', () => {
    afterEach(clearDatabase)

    it('Wrong format', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongParamId']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).get(`/api/address/${wrongParam}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong addressId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/address/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        const token = await initUser('john.doe')

        const addressId = await createdAddress('jane.doe')

        const address = await Addresses.findOne({
            where: {
                addressId: addressId
            }
        })

        const res = await request(app).get(`/api/address/${address?.addressId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.address).toBeDefined()
        expect(res.body.data.address.addressId).toEqual(address?.addressId)
        expect(res.body.data.address.address).toEqual(characters['jane.doe'].address['address'])
        expect(Boolean(res.body.data.address.additionnalAddress)).toEqual(Boolean(characters['jane.doe'].address['additionnalAddress']))
        expect(res.body.data.address.city).toEqual(characters['jane.doe'].address['city'])
        expect(res.body.data.address.postCode).toEqual(characters['jane.doe'].address['postCode'])
        expect(res.body.data.address.country).toEqual(characters['jane.doe'].address['country'])
    })
})

// ! DONE
describe('ROUTE (POST): /api/address (Create new address)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        address: 'Allée du Général de Gaulle',
        additionnalAddress: "",
        city: 'Talence',
        postCode: '33400',
        country: 'FRA'
    }

    it('Wrong address', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = ['', 100, null, undefined, 'addressTooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooLong']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/address')
                .send({
                    address: {
                        ...goodParams,
                        address: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong additionnalAddress', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [100, 'additionnalAddressTooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooLong']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/address')
                .send({
                    address: {
                        ...goodParams,
                        additionnalAddress: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong city', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = ['', 100, null, undefined, 'cityTooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooLong']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/address')
                .send({
                    address: {
                        ...goodParams,
                        city: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong postCode', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = ['', '012345678910toolong']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/address')
                .send({
                    address: {
                        ...goodParams,
                        postCode: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong country', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = ['', null, undefined, 'FR', 'FRAN', 10000]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/address')
                .send({
                    address: {
                        ...goodParams,
                        country: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .post('/api/address')
            .send({
                address: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.addressId).toBeDefined()

        const address = await Addresses.findOne({
            where: {
                addressId: res.body.data.addressId
            }
        })

        expect(address?.addressId).toEqual(res.body.data.addressId)
        expect(address?.address).toEqual(goodParams.address)
        expect(address?.additionnalAddress).toEqual(goodParams.additionnalAddress)
        expect(address?.city).toEqual(goodParams.city)
        expect(address?.postCode).toEqual(goodParams.postCode)
        expect(address?.country).toEqual(goodParams.country)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/address/:id (Update address)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        address: 'Allée du Général de Gaullee',
        additionnalAddress: 'Rue quelconquee',
        city: 'Talencee',
        postCode: '33401',
        country: 'ESP'
    }

    it('Wrong format addressId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/address/${wrongParam}`)
                .send({
                    address: {
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong addressId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/address/${-10}`)
            .send({
                address: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong address', async () => {
        const token = await initUser('john.doe')

        const addressId = await createdAddress('jane.doe')

        const wrongParamList = ['', 100, null, undefined, 'addressTooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooLong']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/address/${addressId}`)
                .send({
                    address: {
                        ...goodParams,
                        address: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong additionnalAddress', async () => {
        const token = await initUser('john.doe')

        const addressId = await createdAddress('jane.doe')

        const wrongParamList = [100, 'addressTooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooLong']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/address/${addressId}`)
                .send({
                    address: {
                        ...goodParams,
                        additionnalAddress: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong city', async () => {
        const token = await initUser('john.doe')

        const addressId = await createdAddress('jane.doe')

        const wrongParamList = ['', 100, null, undefined, 'cityTooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooLong']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/address/${addressId}`)
                .send({
                    address: {
                        ...goodParams,
                        city: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong postCode', async () => {
        const token = await initUser('john.doe')

        const addressId = await createdAddress('jane.doe')

        const wrongParamList = ['', '012345678910toolong']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/address/${addressId}`)
                .send({
                    address: {
                        ...goodParams,
                        postCode: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong country', async () => {
        const token = await initUser('john.doe')

        const addressId = await createdAddress('jane.doe')

        const wrongParamList = ['', null, undefined, 'FR', 'FRAN', 10000]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/address/${addressId}`)
                .send({
                    address: {
                        ...goodParams,
                        country: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const addressId = await createdAddress('jane.doe')

        const address = await Addresses.findOne({
            where: {
                addressId: addressId
            }
        })

        expect(address?.addressId).toEqual(addressId)
        expect(address?.address).toEqual(characters['jane.doe'].address.address)
        expect(Boolean(address?.additionnalAddress)).toEqual(Boolean(characters['jane.doe'].address.additionnalAddress))
        expect(address?.city).toEqual(characters['jane.doe'].address.city)
        expect(address?.postCode).toEqual(characters['jane.doe'].address.postCode)
        expect(address?.country).toEqual(characters['jane.doe'].address.country)

        const res = await request(app)
            .put(`/api/address/${addressId}`)
            .send({
                address: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedAddress = await Addresses.findOne({
            where: {
                addressId: addressId
            }
        })

        expect(updatedAddress?.addressId).toEqual(addressId)
        expect(updatedAddress?.address).toEqual(goodParams.address)
        expect(updatedAddress?.additionnalAddress).toEqual(goodParams.additionnalAddress)
        expect(updatedAddress?.city).toEqual(goodParams.city)
        expect(updatedAddress?.postCode).toEqual(goodParams.postCode)
        expect(updatedAddress?.country).toEqual(goodParams.country)
    })
})

// ! DONE
describe('ROUTE (DELETE): /api/address/:id (Delete address)', () => {
    afterEach(clearDatabase)

    it('Wrong format addressId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/address/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong addressId (address not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/address/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const addressId = await createdAddress('jane.doe')

        const address = await Addresses.findOne({
            where: {
                addressId: addressId
            }
        })

        expect(address).toBeTruthy()

        const res = await request(app).delete(`/api/address/${addressId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedAddress = await Addresses.findOne({
            where: {
                addressId: addressId
            }
        })

        expect(deletedAddress).not.toBeTruthy()
    })
})
