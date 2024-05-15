import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { initUser } from './seeders/general'
import { createDocument } from './seeders/document.seeders'
import Documents from '../src/models/document.model'
// import { documents } from './seeders/data/documents.data'
// import { createUser } from './seeders/user.seeders'
// import { createDocumentType } from './seeders/documentType.seeders'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/document (Get all documents)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createDocument(1, 'john.doe')
        await createDocument(2, 'jane.doe')

        const res = await request(app).get('/api/document').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.documents.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.documents[i].documentId).toBeDefined()
            expect(res.body.data.documents[i].typeId).toBeDefined()
            expect(res.body.data.documents[i].authorId).toBeDefined()
            expect(res.body.data.documents[i].name).toBeDefined()
            expect(res.body.data.documents[i].path).toBeDefined()
            expect(res.body.data.documents[i].information).toBeDefined()
            expect(res.body.data.documents[i].status).toBeDefined()
            expect(res.body.data.documents[i].version).toBeDefined()
            expect(res.body.data.documents[i].createdAt).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/document/:documentId (Get a specific document)', () => {
    afterEach(clearDatabase)

    it('Wrong format id', async () => {
        const token = await initUser('john.doe')

        const wrongFormatIdList = [null, undefined, 'wrongId']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app).get(`/api/document/${wrongFormatId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong noteId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/document/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        const documentId = await createDocument(1, 'john.doe')

        const token = await initUser('john.doe')

        const document = await Documents.findOne({
            where: {
                documentId: documentId
            }
        })

        const res = await request(app).get(`/api/document/${document?.documentId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.document).toBeDefined()
        expect(res.body.data.document.documentId).toEqual(document?.documentId)
        expect(res.body.data.document.authorId).toEqual(document?.authorId)
        expect(res.body.data.document.typeId).toEqual(document?.typeId)
        expect(res.body.data.document.name).toEqual(document?.name)
        expect(res.body.data.document.path).toEqual(document?.path)
        expect(res.body.data.document.status).toEqual(document?.status)
        expect(res.body.data.document.information).toEqual(document?.information)
        expect(res.body.data.document.version).toEqual(document?.version)
    })
})

// ! not done, too much change recently
// describe('ROUTE (POST): /api/document (Create new document)', () => {
//     afterEach(clearDatabase)

//     const goodParams = {
//         name: '2.png',
//         path: '../docs/2.png',
//         version: 2,
//         information: 'hey|zut',
//         status: 'A relire'
//     }

//     it('Wrong format authorId', async () => {
//         const token = await initUser('john.doe')

//         const wrongFormatIdList = [null, undefined, 'Id']

//         for (const wrongFormatId of wrongFormatIdList) {
//             const res = await request(app)
//                 .post('/api/document')
//                 .send({
//                     document: {
//                         authorId: wrongFormatId,
//                         ...goodParams
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong authorId', async () => {
//         const token = await initUser('john.doe')

//         const res = await request(app)
//             .post('/api/document')
//             .send({
//                 document: {
//                     authorId: -10,
//                     ...goodParams
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`)
//         expect(res.status).toEqual(404)
//     })

//     it('Wrong format typeId', async () => {
//         const token = await initUser('john.doe')

//         const authorId = await createUser('john.doe')

//         const wrongFormatIdList = [null, undefined, 'Id']

//         for (const wrongFormatId of wrongFormatIdList) {
//             const res = await request(app)
//                 .post('/api/document')
//                 .send({
//                     document: {
//                         authorId: authorId,
//                         typeId: wrongFormatId,
//                         ...goodParams
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong typeId', async () => {
//         const token = await initUser('john.doe')

//         const authorId = await createUser('john.doe')

//         const res = await request(app)
//             .post('/api/document')
//             .send({
//                 document: {
//                     authorId: authorId,
//                     typeId: -10,
//                     ...goodParams
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`)
//         expect(res.status).toEqual(404)
//     })

//     it('Wrong name', async () => {
//         const token = await initUser('john.doe')

//         const typeId = await createDocumentType('affiche')
//         const authorId = await createUser('jane.doe')

//         const wrongNameList = ['', null, undefined, 'CommentToooo' + 'o'.repeat(40) + 'oLong']

//         for (const wrongName of wrongNameList) {
//             const res = await request(app)
//                 .post('/api/document')
//                 .send({
//                     document: {
//                         authorId: authorId,
//                         typeId: typeId,
//                         ...goodParams,
//                         name: wrongName
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong path', async () => {
//         const token = await initUser('john.doe')

//         const typeId = await createDocumentType('affiche')
//         const authorId = await createUser('jane.doe')

//         const wrongPathList = ['', null, undefined, 'CommentToooo' + 'o'.repeat(40) + 'oLong']

//         for (const wrongPath of wrongPathList) {
//             const res = await request(app)
//                 .post('/api/document')
//                 .send({
//                     document: {
//                         authorId: authorId,
//                         typeId: typeId,
//                         ...goodParams,
//                         path: wrongPath
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong version', async () => {
//         const token = await initUser('john.doe')

//         const typeId = await createDocumentType('affiche')
//         const authorId = await createUser('jane.doe')

//         const wrongVersionList = ['', null, undefined, -10]

//         for (const wrongVersion of wrongVersionList) {
//             const res = await request(app)
//                 .post('/api/document')
//                 .send({
//                     document: {
//                         authorId: authorId,
//                         typeId: typeId,
//                         ...goodParams,
//                         version: wrongVersion
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong information', async () => {
//         const token = await initUser('john.doe')

//         const typeId = await createDocumentType('affiche')
//         const authorId = await createUser('jane.doe')

//         const wrongInformationList = ['', null, undefined, 'CommentToooo' + 'o'.repeat(90) + 'oLong']

//         for (const wrongInformation of wrongInformationList) {
//             const res = await request(app)
//                 .post('/api/document')
//                 .send({
//                     document: {
//                         authorId: authorId,
//                         typeId: typeId,
//                         ...goodParams,
//                         information: wrongInformation
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong status', async () => {
//         const token = await initUser('john.doe')

//         const typeId = await createDocumentType('affiche')
//         const authorId = await createUser('jane.doe')

//         const wrongStatusList = ['', null, undefined, 'CommentToooo' + 'o'.repeat(40) + 'oLong']

//         for (const wrongStatus of wrongStatusList) {
//             const res = await request(app)
//                 .post('/api/document')
//                 .send({
//                     document: {
//                         authorId: authorId,
//                         typeId: typeId,
//                         ...goodParams,
//                         status: wrongStatus
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Good usage', async () => {
//         const token = await initUser('john.doe')

//         const typeId = await createDocumentType('affiche')
//         const authorId = await createUser('jane.doe')

//         const res = await request(app)
//             .post('/api/document')
//             .send({
//                 document: {
//                     typeId: typeId,
//                     authorId: authorId,
//                     ...goodParams
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`)

//         expect(res.status).toEqual(200)
//         expect(res.body.data.documentId).toBeDefined()

//         const doc = await Documents.findOne({
//             where: {
//                 documentId: res.body.data.documentId
//             }
//         })

//         expect(doc?.documentId).toEqual(res.body.data.documentId)
//         expect(doc?.typeId).toEqual(typeId)
//         expect(doc?.authorId).toEqual(authorId)
//         expect(doc?.name).toEqual(goodParams.name)
//         expect(doc?.path).toEqual(goodParams.path)
//         expect(doc?.version).toEqual(goodParams.version)
//         expect(doc?.information).toEqual(goodParams.information)
//         expect(doc?.status).toEqual(goodParams.status)
//     })
// })

// ! not done, too much change recently
// describe('ROUTE (PUT): /api/document/:id (Update document)', () => {
//     afterEach(clearDatabase)

//     const goodParams = {
//         name: '2.png',
//         path: '../docs/2.png',
//         version: 2,
//         information: 'hey|zut',
//         status: 'A relire'
//     }

//     it('Wrong format documentId', async () => {
//         const token = await initUser('john.doe')

//         const wrongParamList = [null, undefined, 'wrongIdFormat']

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .put(`/api/document/${wrongParam}`)
//                 .send({
//                     document: {
//                         ...goodParams
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong documentId', async () => {
//         const token = await initUser('john.doe')

//         const res = await request(app)
//             .put(`/api/document/${-10}`)
//             .send({
//                 document: {
//                     ...goodParams
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`)
//         expect(res.status).toEqual(404)
//     })

//     it('Wrong format authorId', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')

//         const wrongParamList = [null, undefined, 'wrongIdFormat']

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .put(`/api/document/${docId}}`)
//                 .send({
//                     document: {
//                         ...goodParams,
//                         authorId: wrongParam
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong authorId', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')

//         const res = await request(app)
//             .put(`/api/document/${docId}}`)
//             .send({
//                 document: {
//                     ...goodParams,
//                     authorId: -10
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`)
//         expect(res.status).toEqual(404)
//     })

//     it('Wrong format typeId', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')
//         const authorId = await createUser('john.doe')

//         const wrongParamList = [null, undefined, 'wrongIdFormat']

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .put(`/api/document/${docId}}`)
//                 .send({
//                     document: {
//                         ...goodParams,
//                         authorId: authorId,
//                         typeId: wrongParam
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong typeId', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')
//         const authorId = await createUser('john.doe')

//         const res = await request(app)
//             .put(`/api/document/${docId}}`)
//             .send({
//                 document: {
//                     ...goodParams,
//                     authorId: authorId,
//                     typeId: -10
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`)
//         expect(res.status).toEqual(404)
//     })

//     it('Wrong name', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')
//         const authorId = await createUser('john.doe')
//         const typeId = await createDocumentType('facture')

//         const wrongNameList = ['', null, undefined, 'CommentToooo' + 'o'.repeat(50) + 'oLong']

//         for (const wrongName of wrongNameList) {
//             const res = await request(app)
//                 .put(`/api/document/${docId}`)
//                 .send({
//                     document: {
//                         typeId: typeId,
//                         authorId: authorId,
//                         ...goodParams,
//                         name: wrongName
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong path', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')
//         const authorId = await createUser('john.doe')
//         const typeId = await createDocumentType('facture')

//         const wrongPathList = ['', null, undefined, 'CommentToooo' + 'o'.repeat(50) + 'oLong']

//         for (const wrongPath of wrongPathList) {
//             const res = await request(app)
//                 .put(`/api/document/${docId}`)
//                 .send({
//                     document: {
//                         typeId: typeId,
//                         authorId: authorId,
//                         ...goodParams,
//                         path: wrongPath
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong version', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')
//         const authorId = await createUser('john.doe')
//         const typeId = await createDocumentType('facture')

//         const wrongVersionList = ['', null, undefined, -10]

//         for (const wrongVersion of wrongVersionList) {
//             const res = await request(app)
//                 .put(`/api/document/${docId}`)
//                 .send({
//                     document: {
//                         typeId: typeId,
//                         authorId: authorId,
//                         ...goodParams,
//                         version: wrongVersion
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong information', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')
//         const authorId = await createUser('john.doe')
//         const typeId = await createDocumentType('facture')

//         const wrongInformationList = ['', null, undefined, 'CommentToooo' + 'o'.repeat(90) + 'oLong']

//         for (const wrongInformation of wrongInformationList) {
//             const res = await request(app)
//                 .put(`/api/document/${docId}`)
//                 .send({
//                     document: {
//                         typeId: typeId,
//                         authorId: authorId,
//                         ...goodParams,
//                         information: wrongInformation
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong status', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')
//         const authorId = await createUser('john.doe')
//         const typeId = await createDocumentType('facture')

//         const wrongStatusList = ['', null, undefined, 'CommentToooo' + 'o'.repeat(20) + 'oLong']

//         for (const wrongStatus of wrongStatusList) {
//             const res = await request(app)
//                 .put(`/api/document/${docId}`)
//                 .send({
//                     document: {
//                         typeId: typeId,
//                         authorId: authorId,
//                         ...goodParams,
//                         status: wrongStatus
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Good usage', async () => {
//         const token = await initUser('john.doe')

//         const docId = await createDocument(1, 'jane.doe')
//         const authorId = await createUser('john.doe')
//         const typeId = await createDocumentType('facture')

//         const doc = await Documents.findOne({
//             where: {
//                 documentId: docId
//             }
//         })

//         expect(doc?.documentId).toEqual(docId)
//         expect(doc?.name).toEqual(documents['doc1'].name)
//         expect(doc?.path).toEqual(documents['doc1'].path)
//         expect(doc?.version).toEqual(documents['doc1'].version)
//         expect(doc?.information).toEqual(documents['doc1'].information)
//         expect(doc?.status).toEqual(documents['doc1'].status)

//         const res = await request(app)
//             .put(`/api/document/${docId}`)
//             .send({
//                 document: {
//                     ...goodParams,
//                     authorId: authorId,
//                     typeId: typeId
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`)

//         expect(res.status).toEqual(200)

//         const updatedDoc = await Documents.findOne({
//             where: {
//                 documentId: docId
//             }
//         })

//         expect(updatedDoc?.documentId).toEqual(docId)
//         expect(updatedDoc?.version).toEqual(goodParams.version)
//         expect(updatedDoc?.name).toEqual(goodParams.name)
//         expect(updatedDoc?.path).toEqual(goodParams.path)
//         expect(updatedDoc?.information).toEqual(goodParams.information)
//         expect(updatedDoc?.status).toEqual(goodParams.status)
//         expect(updatedDoc?.authorId).toEqual(authorId)
//         expect(updatedDoc?.typeId).toEqual(typeId)
//     })
// })

// ! not done, too much change recently
// describe('ROUTE (DELETE): /api/document/:documentId (Delete document)', () => {
//     afterEach(clearDatabase)

//     it('Wrong format Id', async () => {
//         const token = await initUser('john.doe')

//         const wrongParamList = [null, undefined, 'wrongIdFormat']

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app).delete(`/api/document/${wrongParam}`).set('Authorization', `Bearer ${token}`)
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong Id (document not found)', async () => {
//         const token = await initUser('john.doe')

//         const res = await request(app).delete(`/api/document/${-10}`).set('Authorization', `Bearer ${token}`)
//         expect(res.status).toEqual(404)
//     })

//     it('Good usage', async () => {
//         const token = await initUser('john.doe')

//         const documentId = await createDocument(1, 'john.doe')

//         const document = await Documents.findOne({
//             where: {
//                 documentId: documentId
//             }
//         })

//         expect(document).toBeTruthy()

//         const res = await request(app).delete(`/api/document/${documentId}`).set('Authorization', `Bearer ${token}`)

//         expect(res.status).toEqual(200)

//         const deletedDocument = await Documents.findOne({
//             where: {
//                 documentId: documentId
//             }
//         })

//         expect(deletedDocument).not.toBeTruthy()
//     })
// })
