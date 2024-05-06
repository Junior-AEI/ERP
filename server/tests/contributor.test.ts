import request from 'supertest'
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { initUser } from './seeders/general'
import { createContributor } from './seeders/contributor.seeders'
import Contributors from '../src/models/contributor.model'
import { createMember } from './seeders/member.seeders'
import { createProject } from './seeders/project.seeders'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/contributor (Get all contributors)', () => {

    afterEach(clearDatabase);

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createContributor('AAA', 'johnny.doe', 'jane.doe')
        await createContributor('BBB', 'jane.doe', 'john.doe')

        const res = await request(app)
            .get('/api/contributor')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.contributors.length).toEqual(2);

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.contributors[i].contributorId).toBeDefined();
            expect(res.body.data.contributors[i].projectId).toBeDefined();
            expect(res.body.data.contributors[i].memberId).toBeDefined();
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/contributor/:contributorId (Get a specific contributor)', () => {

    afterEach(clearDatabase);

    it('Wrong format id', async () => {

        const token = await initUser('john.doe')

        const wrongFormatIdList = [
            null,
            undefined,
            "wrongId"
        ]

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .get(`/api/contributor/${wrongFormatId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong Id with a good format', async () => {
        
        const token = await initUser('john.doe')
        
        const res = await request(app)
        .get(`/api/contributor/${-10}`)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).toEqual(404)
    })
    
    it('Normal usage', async () => {
        const contributorId = await createContributor('AAA', 'johnny.doe', 'jane.doe')

        const token = await initUser('john.doe')

        const contributor = await Contributors.findOne({
            where: {
                contributorId: contributorId
            }
        })

        const res = await request(app)
            .get(`/api/contributor/${contributor?.contributorId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.contributor).toBeDefined();
        expect(res.body.data.contributor.contributorId).toEqual(contributor?.contributorId);
        expect(res.body.data.contributor.projectId).toEqual(contributor?.projectId);
        expect(res.body.data.contributor.memberId).toEqual(contributor?.memberId);
    })
})

// ! DONE
describe('ROUTE (POST): /api/contributor (Create new contributor)', () => {

    afterEach(clearDatabase);

    it('Wrong format projectId', async () => {

        const token = await initUser('john.doe')

        const wrongFormatIdList = [
            null,
            undefined,
            "Id",
        ]

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post("/api/contributor")
                .send({
                    contributor: {
                        projectId: wrongFormatId,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Wrong projectId', async () => {

        const token = await initUser('john.doe')
        
        const res = await request(app)
        .post("/api/contributor")
        .send({
            contributor: {
                projectId: -10,
            }
        })
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong format memberId', async () => {

        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')

        const wrongFormatIdList = [
            null,
            undefined,
            "Id",
        ]

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post("/api/contributor")
                .send({
                    contributor: {
                        projectId: projectId,
                        memberId: wrongFormatId,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Wrong memberId', async () => {

        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')
        
        const res = await request(app)
        .post("/api/contributor")
        .send({
            contributor: {
                projectId: projectId,
                memberId: -10,
            }
        })
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })
    
    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')
        const memberId = await createMember('jane.doe')

        const res = await request(app)
            .post("/api/contributor")
            .send({
                contributor: {
                    projectId: projectId,
                    memberId: memberId,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.data.contributorId).toBeDefined()

        const contributor = await Contributors.findOne({
            where: {
                contributorId: res.body.data.contributorId
            }
        })

        expect(contributor?.contributorId).toEqual(res.body.data.contributorId)
        expect(contributor?.projectId).toEqual(projectId)
        expect(contributor?.memberId).toEqual(memberId)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/contributor/:id (Update contributor)', () => {
    afterEach(clearDatabase);

    it('Wrong format contributorId', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/contributor/${wrongParam}`)
                .send({
                    contributor: {
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong contributorId', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/contributor/${-10}`)
            .send({
                contributor: {
                }
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong format projectId', async () => {

        const token = await initUser('john.doe')

        const contributorId = await createContributor('AAA', 'johnny.doe', 'jane.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/contributor/${contributorId}}`)
                .send({
                    contributor: {
                        projectId: wrongParam,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong projectId', async () => {

        const token = await initUser('john.doe')

        const contributorId = await createContributor('AAA', 'johnny.doe', 'jane.doe')

        const res = await request(app)
            .put(`/api/contributor/${contributorId}}`)
            .send({
                contributor: {
                    projectId: -10,
                }
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong format memberId', async () => {

        const token = await initUser('john.doe')

        const contributorId = await createContributor('AAA', 'johnny.doe', 'jane.doe')
        const projectId = await createProject('BBB', 'jane.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/contributor/${contributorId}}`)
                .send({
                    contributor: {
                        projectId: projectId,
                        writerId: wrongParam,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong memberId', async () => {

        const token = await initUser('john.doe')

        const contributorId = await createContributor('AAA', 'johnny.doe', 'jane.doe')
        const projectId = await createProject('BBB', 'jane.doe')

        const res = await request(app)
            .put(`/api/contributor/${contributorId}}`)
            .send({
                contributor: {
                    projectId: projectId,
                    memberId:  -10,
                }
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const contributorId = await createContributor('AAA', 'johnny.doe', 'jane.doe')
        const projectId = await createProject('BBB', 'jane.doe')
        const memberId = await createMember('john.doe')

        const contributor = await Contributors.findOne({
            where: {
                contributorId: contributorId
            }
        })

        expect(contributor?.contributorId).toEqual(contributorId)
        
        const res = await request(app)
            .put(`/api/contributor/${contributorId}`)
            .send({
                contributor: {
                    projectId: projectId,
                    memberId: memberId,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)

        const updatedContributor = await Contributors.findOne({
            where: {
                contributorId: contributorId
            }
        })

        expect(updatedContributor?.contributorId).toEqual(contributorId)
        expect(updatedContributor?.memberId).toEqual(memberId)
        expect(updatedContributor?.projectId).toEqual(projectId)
    })  
})

// ! DONE
describe('ROUTE (DELETE): /api/contributor/:id (Delete contributor)', () => {

    afterEach(clearDatabase);

    it('Wrong format contributorId', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .delete(`/api/contributor/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong contributorId (contributor not found)', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .delete(`/api/contributor/${-10}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const contributorId = await createContributor('AAA', 'johnny.doe', 'jane.doe')

        const contributor = await Contributors.findOne({
            where: {
                contributorId: contributorId
            }
        })

        expect(contributor).toBeTruthy()

        const res = await request(app)
            .delete(`/api/contributor/${contributorId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)

        const deletedContributor = await Contributors.findOne({
            where: {
                contributorId: contributorId
            }
        })

        expect(deletedContributor).not.toBeTruthy()
    })

})