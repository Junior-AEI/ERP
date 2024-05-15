import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import Companies from '../src/models/company.model'
import { initUser } from './seeders/general'
import { createAddress, createCompany } from './seeders/company.seeders'
import { companies } from './seeders/data/companies.data'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/company (Get all companies)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createCompany('Enseirb')
        await createCompany('Matmeca')

        const res = await request(app).get('/api/company').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.companies.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.companies[i].companyId).toBeDefined()
            expect(res.body.data.companies[i].name).toBeDefined()
            expect(res.body.data.companies[i].legalEntity).toBeDefined()
            expect(res.body.data.companies[i].companyType).toBeDefined()
            expect(res.body.data.companies[i].activityField).toBeDefined()
            expect(res.body.data.companies[i].createdAt).toBeDefined()
            expect(res.body.data.companies[i].updatedAt).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/company/:companyId (Get a specific company)', () => {
    afterEach(clearDatabase)

    it('Wrong format', async () => {
        const token = await initUser('john.doe')

        const wrongFormatCompanyIdList = [null, undefined, 'wrongCompanyId']

        for (const wrongFormatCompanyId of wrongFormatCompanyIdList) {
            const res = await request(app).get(`/api/company/${wrongFormatCompanyId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong companyId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/company/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        await createCompany('Enseirb')
        await createCompany('Matmeca')

        const token = await initUser('john.doe')

        const company = await Companies.findOne({
            where: {
                name: 'Enseirb'
            }
        })

        const res = await request(app).get(`/api/company/${company?.companyId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.company).toBeDefined()
        expect(res.body.data.company.companyId).toEqual(company?.companyId)
        expect(res.body.data.company.name).toEqual(company?.name)
        expect(res.body.data.company.legalEntity).toEqual(company?.legalEntity)
        expect(res.body.data.company.companyType).toEqual(company?.companyType)
        expect(res.body.data.company.activityField).toEqual(company?.activityField)
    })
})

// ! DONE
describe('ROUTE (POST): /api/company (Create new company)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        name: 'Matmeca',
        legalEntity: 'Non',
        companyType: 'TPE',
        activityField: 'Electroménager'
    }

    it('Wrong format addressId', async () => {
        const token = await initUser('john.doe')

        const wrongFormatAddressIdList = [null, undefined, 'addressId']

        for (const wrongFormatAddressId of wrongFormatAddressIdList) {
            const res = await request(app)
                .post('/api/company')
                .send({
                    company: {
                        addressId: wrongFormatAddressId,
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
            .post('/api/company')
            .send({
                company: {
                    addressId: -10,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong name', async () => {
        const token = await initUser('john.doe')

        const addressId = await createAddress('Enseirb')

        const wrongNameList = ['', null, undefined, 'NameToooo' + 'o'.repeat(60) + 'oLong']

        for (const wrongName of wrongNameList) {
            const res = await request(app)
                .post('/api/company')
                .send({
                    company: {
                        addressId: addressId,
                        ...goodParams,
                        name: wrongName
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong legal entity', async () => {
        const token = await initUser('john.doe')

        const addressId = await createAddress('Enseirb')

        const wrongLegalEntityList = ['sh', null, undefined, 'LegalEntityToooo' + 'o'.repeat(40) + 'oLong']

        for (const wrongLegalEntity of wrongLegalEntityList) {
            const res = await request(app)
                .post('/api/company')
                .send({
                    company: {
                        addressId: addressId,
                        ...goodParams,
                        legalEntity: wrongLegalEntity
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong company type', async () => {
        const token = await initUser('john.doe')

        const addressId = await createAddress('Enseirb')

        const wrongTypeList = ['sh', null, undefined, 'TypeTooooooooLong', 'notinlist']

        for (const wrongTypeEntity of wrongTypeList) {
            const res = await request(app)
                .post('/api/company')
                .send({
                    company: {
                        addressId: addressId,
                        ...goodParams,
                        companyType: wrongTypeEntity,
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong activity field', async () => {
        const token = await initUser('john.doe')

        const addressId = await createAddress('Enseirb')

        const wrongFieldList = ['', null, undefined, 'LegalEntityToooo' + 'o'.repeat(50) + 'oLong']

        for (const wrongField of wrongFieldList) {
            const res = await request(app)
                .post('/api/company')
                .send({
                    company: {
                        addressId: addressId,
                        ...goodParams,
                        activityField: wrongField,
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const addressId = await createAddress('Enseirb')

        const res = await request(app)
            .post('/api/company')
            .send({
                company: {
                    addressId: addressId,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.companyId).toBeDefined()

        const company = await Companies.findOne({
            where: {
                companyId: res.body.data.companyId
            }
        })

        expect(company?.companyId).toEqual(res.body.data.companyId)
        expect(company?.name).toEqual(goodParams.name)
        expect(company?.legalEntity).toEqual(goodParams.legalEntity)
        expect(company?.companyType).toEqual(goodParams.companyType)
        expect(company?.activityField).toEqual(goodParams.activityField)
        expect(company?.addressId).toEqual(addressId)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/company/:id (Update company)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        name: 'Matmeca',
        legalEntity: 'Non',
        companyType: 'TPE',
        activityField: 'Electroménager'
    }

    it('Wrong format companyId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongCompanyIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/company/${wrongParam}`)
                .send({
                    company: {
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong companyId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/company/${-10}`)
            .send({
                company: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong format addressId', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')

        const wrongParamList = [null, undefined, 'wrongAddressIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/company/${companyId}}`)
                .send({
                    company: {
                        ...goodParams,
                        addressId: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong addressId', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')

        const res = await request(app)
            .put(`/api/company/${companyId}}`)
            .send({
                company: {
                    ...goodParams,
                    addressId: -10
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong name', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')

        const wrongNameList = ['', null, undefined, 'NameToooo' + 'o'.repeat(60) + 'oLong', 19]

        for (const wrongName of wrongNameList) {
            const res = await request(app)
                .put(`/api/company/${companyId}`)
                .send({
                    company: {
                        ...goodParams,
                        name: wrongName
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong legal entity', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')

        const wrongLegalEntityList = ['sh', null, undefined, 'LegalEntityToooo' + 'o'.repeat(40) + 'oLong']

        for (const wrongParam of wrongLegalEntityList) {
            const res = await request(app)
                .put(`/api/company/${companyId}`)
                .send({
                    company: {
                        ...goodParams,
                        legalEntity: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong company type', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')

        const wrongTypeList = ['sh', null, undefined, 'TypeToooooooooooLong', 'notinlist']

        for (const wrongParam of wrongTypeList) {
            const res = await request(app)
                .put(`/api/company/${companyId}`)
                .send({
                    company: {
                        ...goodParams,
                        companyType: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong activity field', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')

        const wrongFieldList = ['', null, undefined, 'NameToooo' + 'o'.repeat(60) + 'oLong', 19]

        for (const wrongField of wrongFieldList) {
            const res = await request(app)
                .put(`/api/company/${companyId}`)
                .send({
                    company: {
                        ...goodParams,
                        activityField: wrongField
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const addressId = await createAddress('Enseirb')
        const companyId = await createCompany('Enseirb')

        const company = await Companies.findOne({
            where: {
                companyId: companyId
            }
        })

        expect(company?.companyId).toEqual(companyId)
        expect(company?.name).toEqual(companies['Enseirb'].name)
        expect(company?.legalEntity).toEqual(companies['Enseirb'].legalEntity)
        expect(company?.companyType).toEqual(companies['Enseirb'].companyType)
        expect(company?.activityField).toEqual(companies['Enseirb'].activityField)

        const res = await request(app)
            .put(`/api/company/${companyId}`)
            .send({
                company: {
                    ...goodParams,
                    addressId: addressId
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedCompany = await Companies.findOne({
            where: {
                companyId: companyId
            }
        })

        expect(updatedCompany?.companyId).toEqual(companyId)
        expect(updatedCompany?.name).toEqual(goodParams.name)
        expect(updatedCompany?.legalEntity).toEqual(goodParams.legalEntity)
        expect(updatedCompany?.companyType).toEqual(goodParams.companyType)
        expect(updatedCompany?.activityField).toEqual(goodParams.activityField)
        expect(updatedCompany?.addressId).toEqual(addressId)
    })
})

// ! DONE
describe('ROUTE (DELETE): /api/company/:id (Delete company)', () => {
    afterEach(clearDatabase)

    it('Wrong format companyId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongCompanyIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/company/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong companyId (company not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/company/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const companyId = await createCompany('Enseirb')

        const company = await Companies.findOne({
            where: {
                companyId: companyId
            }
        })

        expect(company).toBeTruthy()

        const res = await request(app).delete(`/api/company/${companyId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedCompany = await Companies.findOne({
            where: {
                companyId: companyId
            }
        })

        expect(deletedCompany).not.toBeTruthy()
    })
})
