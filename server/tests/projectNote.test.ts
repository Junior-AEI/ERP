import request from 'supertest'
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { initUser } from './seeders/general'
import { createProjectNote } from './seeders/projectNote.seeder'
import ProjectNotes from '../src/models/projectNote.model'
import { projectNotes } from './seeders/data/projectNotes.data'
import { createUser } from './seeders/user.seeders'
import { createProject } from './seeders/project.seeder'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/projectNote (Get all projectNotes)', () => {

    afterEach(clearDatabase);

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createProjectNote(1)
        await createProjectNote(2)

        const res = await request(app)
            .get('/api/projectNote')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.projectNotes.length).toEqual(2);

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.projectNotes[i].noteId).toBeDefined();
            expect(res.body.data.projectNotes[i].projectId).toBeDefined();
            expect(res.body.data.projectNotes[i].writerId).toBeDefined();
            expect(res.body.data.projectNotes[i].comment).toBeDefined();
            expect(res.body.data.projectNotes[i].advancement).toBeDefined();
            expect(res.body.data.projectNotes[i].createdAt).toBeDefined();
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/projectNote/:projectNoteId (Get a specific project note)', () => {

    afterEach(clearDatabase);

    it('Wrong format', async () => {

        const token = await initUser('john.doe')

        const wrongFormatIdList = [
            null,
            undefined,
            "wrongId"
        ]

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .get(`/api/projectNote/${wrongFormatId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong noteId with a good format', async () => {
        
        const token = await initUser('john.doe')
        
        const res = await request(app)
        .get(`/api/projectNote/${-10}`)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).toEqual(404)
    })
    
    it('Normal usage', async () => {
        const noteId = await createProjectNote(1)

        const token = await initUser('john.doe')

        const note = await ProjectNotes.findOne({
            where: {
                noteId: noteId
            }
        })

        const res = await request(app)
            .get(`/api/projectNote/${note?.noteId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.projectNote).toBeDefined();
        expect(res.body.data.projectNote.noteId).toEqual(note?.noteId);
        expect(res.body.data.projectNote.projectId).toEqual(note?.projectId);
        expect(res.body.data.projectNote.writerId).toEqual(note?.writerId);
        expect(res.body.data.projectNote.comment).toEqual(note?.comment);
        expect(res.body.data.projectNote.advancement).toEqual(note?.advancement);
    })
})

// ! DONE
describe('ROUTE (POST): /api/projectNote (Create new project note)', () => {

    afterEach(clearDatabase);

    const goodParams = {
        comment: 'voila voila',
        advancement: 'CE signé',
    }

    it('Wrong format projectId', async () => {

        const token = await initUser('john.doe')

        const wrongFormatIdList = [
            null,
            undefined,
            "Id",
        ]

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post("/api/projectNote")
                .send({
                    projectNote: {
                        projectId: wrongFormatId,
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Wrong projectId', async () => {

        const token = await initUser('john.doe')
        
        const res = await request(app)
        .post("/api/projectNote")
        .send({
            projectNote: {
                projectId: -10,
                ...goodParams
            }
        })
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong format writerId', async () => {

        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')

        const wrongFormatIdList = [
            null,
            undefined,
            "Id",
        ]

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post("/api/projectNote")
                .send({
                    projectNote: {
                        projectId: projectId,
                        writerId: wrongFormatId,
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Wrong writerId', async () => {

        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')
        
        const res = await request(app)
        .post("/api/projectNote")
        .send({
            projectNote: {
                projectId: projectId,
                writerId: -10,
                ...goodParams
            }
        })
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong comment', async () => {
        
        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')
        const userId = await createUser('jane.doe')
        
        const wrongCommentList = [
            "",
            null,
            undefined,
            "CommentToooo" + "o".repeat(1000) + "oLong",
        ]

        for (const wrongComment of wrongCommentList) {
            const res = await request(app)
                .post("/api/projectNote")
                .send({
                    projectNote: {
                        projectId: projectId,
                        writerId: userId,
                        ...goodParams,
                        comment: wrongComment,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Wrong advancement', async () => {

        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')
        const userId = await createUser('jane.doe')
        
        const wrongAdvancementList = [
            "sh",
            null,
            undefined,
            "AdvancementToooo" + "o".repeat(10) + "oLong",
            "not in list"
        ]

        for (const wrongAdvancement of wrongAdvancementList) {
            const res = await request(app)
            .post("/api/projectNote")
            .send({
                projectNote: {
                        projectId: projectId,
                        writerId: userId,
                        ...goodParams,
                        advancement: wrongAdvancement,
                    }
                })
            .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')
        const userId = await createUser('jane.doe')

        const res = await request(app)
            .post("/api/projectNote")
            .send({
                projectNote: {
                    projectId: projectId,
                    writerId: userId,
                    ...goodParams,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.data.noteId).toBeDefined()

        const note = await ProjectNotes.findOne({
            where: {
                noteId: res.body.data.noteId
            }
        })

        expect(note?.noteId).toEqual(res.body.data.noteId)
        expect(note?.projectId).toEqual(projectId)
        expect(note?.writerId).toEqual(userId)
        expect(note?.comment).toEqual(goodParams.comment)
        expect(note?.advancement).toEqual(goodParams.advancement)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/projectNote/:id (Update project note)', () => {
    afterEach(clearDatabase);

    const goodParams = {
        comment: 'voila voila',
        advancement: 'CE signé',
    }

    it('Wrong format noteId', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/projectNote/${wrongParam}`)
                .send({
                    projectNote: {
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong noteId', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/projectNote/${-10}`)
            .send({
                projectNote: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong format projectId', async () => {

        const token = await initUser('john.doe')

        const noteId = await createProjectNote(1)

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/projectNote/${noteId}}`)
                .send({
                    projectNote: {
                        ...goodParams,
                        projectId: wrongParam,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong projectId', async () => {

        const token = await initUser('john.doe')

        const noteId = await createProjectNote(1)

        const res = await request(app)
            .put(`/api/projectNote/${noteId}}`)
            .send({
                projectNote: {
                    ...goodParams,
                    projectId: -10,
                }
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong format writerId', async () => {

        const token = await initUser('john.doe')

        const noteId = await createProjectNote(1)
        const projectId = await createProject('AAA', 'johnny.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/projectNote/${noteId}}`)
                .send({
                    projectNote: {
                        ...goodParams,
                        projectId: projectId,
                        writerId: wrongParam,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong writerId', async () => {

        const token = await initUser('john.doe')

        const noteId = await createProjectNote(1)
        const projectId = await createProject('AAA', 'johnny.doe')

        const res = await request(app)
            .put(`/api/projectNote/${noteId}}`)
            .send({
                projectNote: {
                    ...goodParams,
                    projectId: projectId,
                    writerId:  -10,
                }
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong comment', async () => {
        
        const token = await initUser('john.doe')

        const noteId = await createProjectNote(1)
        const projectId = await createProject("AAA", 'johnny.doe')
        const writerId = await createUser('jane.doe')

        const wrongCommentList = [
            "",
            null,
            undefined,
            "CommentToooo" + "o".repeat(1000) + "oLong",
        ]

        for (const wrongComment of wrongCommentList) {
            const res = await request(app)
                .put(`/api/projectNote/${noteId}`)
                .send({
                    projectNote: {
                        projectId: projectId,
                        writerId: writerId,
                        ...goodParams,
                        comment: wrongComment
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Wrong advancement', async () => {

        const token = await initUser('john.doe')

        const noteId = await createProjectNote(1)
        const projectId = await createProject("AAA", 'johnny.doe')
        const writerId = await createUser('jane.doe')

        const wrongAdvancementList = [
            "sh",
            null,
            undefined,
            "AdvancementToooo" + "o".repeat(10) + "oLong",
            "not in list"
        ]

        for (const wrongAdvancement of wrongAdvancementList) {
            const res = await request(app)
                .put(`/api/projectNote/${noteId}`)
                .send({
                    projectNote: {
                        projectId: projectId,
                        writerId: writerId,
                        ...goodParams,
                        advancement: wrongAdvancement,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const noteId = await createProjectNote(1)
        const projectId = await createProject("AAA", 'johnny.doe')
        const writerId = await createUser('jane.doe')

        const note = await ProjectNotes.findOne({
            where: {
                noteId: noteId
            }
        })

        expect(note?.noteId).toEqual(noteId)
        expect(note?.comment).toEqual(projectNotes['note1'].comment)
        expect(note?.advancement).toEqual(projectNotes['note1'].advancement)
        
        const res = await request(app)
            .put(`/api/projectNote/${noteId}`)
            .send({
                projectNote: {
                    ...goodParams,
                    projectId: projectId,
                    writerId: writerId,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)

        const updatedNote = await ProjectNotes.findOne({
            where: {
                noteId: noteId
            }
        })

        expect(updatedNote?.noteId).toEqual(noteId)
        expect(updatedNote?.comment).toEqual(goodParams.comment)
        expect(updatedNote?.advancement).toEqual(goodParams.advancement)
        expect(updatedNote?.projectId).toEqual(projectId)
        expect(updatedNote?.writerId).toEqual(writerId)
    })  
})

describe('ROUTE (DELETE): /api/projectNote/:id (Delete project note)', () => {

    afterEach(clearDatabase);

    it('Wrong format noteId', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .delete(`/api/projectNote/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong noteId (note not found)', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .delete(`/api/projectNote/${-10}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const noteId = await createProjectNote(1)

        const note = await ProjectNotes.findOne({
            where: {
                noteId: noteId
            }
        })

        expect(note).toBeTruthy()

        const res = await request(app)
            .delete(`/api/projectNote/${noteId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)

        const deletedNote = await ProjectNotes.findOne({
            where: {
                noteId: noteId
            }
        })

        expect(deletedNote).not.toBeTruthy()
    })

})