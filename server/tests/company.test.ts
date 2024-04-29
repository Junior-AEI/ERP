import request from 'supertest'
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase, showErrorMessage } from './utils'
import Companies from '../src/models/company.model'
import { initUser } from './seeders/general'
import { createCompany } from './seeders/company.seeders'
import { companies } from './seeders/data/companies.data'
import { promisify } from "util"

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/company (Get all companies)', () => {

    afterEach(clearDatabase);

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createCompany('Enseirb')
        await createCompany('Matmeca')

        const res = await request(app)
            .get('/api/company')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.companies.length).toEqual(2);

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.companies[i].companyId).toBeDefined();
            expect(res.body.data.companies[i].name).toBeDefined();
            expect(res.body.data.companies[i].legalEntity).toBeDefined();
            expect(res.body.data.companies[i].createdAt).toBeDefined();
            expect(res.body.data.companies[i].updatedAt).toBeDefined();
        }

    })

})


describe('ROUTE (GET): /api/user/:companyId (Get a specific company)', () => {

    afterEach(clearDatabase);

    it('Wrong format', async () => {

        const token = await initUser('john.doe')

        const wrongFormatCompanyIdList = [
            null,
            undefined,
            "wrongCompanyId"
        ]

        for (const wrongFormatCompanyId of wrongFormatCompanyIdList) {
            const res = await request(app)
                .get(`/api/company/${wrongFormatCompanyId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong companyId with a good format', async () => {
        
        const token = await initUser('john.doe')
        
        const res = await request(app)
        .get(`/api/company/${-10}`)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).toEqual(404)
    })
    
    it('Normal usage', async () => {
        await createCompany('Enseirb')
        await createCompany('Matmeca')
        
        const token = await initUser('john.doe')

        const company = await Companies.findOne({
            where: {
                name: "Enseirb"
            }
        })

        const res = await request(app)
            .get(`/api/company/${company?.companyId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.company).toBeDefined();
        expect(res.body.data.company.companyId).toEqual(company?.companyId);
        expect(res.body.data.company.name).toEqual(company?.name);
        expect(res.body.data.company.legalEntity).toEqual(company?.legalEntity);
    })
})