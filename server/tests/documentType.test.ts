import request from 'supertest'
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { initUser } from './seeders/general'
import { createDocumentType } from './seeders/documentType.seeders'
import DocumentTypes from '../src/models/documentType.model'
import { documentTypes } from './seeders/data/documentTypes.data'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/documentType (Get all document types)', () => {

    afterEach(clearDatabase);

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createDocumentType('affiche')
        await createDocumentType('facture')

        const res = await request(app)
            .get('/api/documentType')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.documentTypes.length).toEqual(2);

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.documentTypes[i].typeId).toBeDefined();
            expect(res.body.data.documentTypes[i].type).toBeDefined();
            expect(res.body.data.documentTypes[i].fieldNumber).toBeDefined();
            expect(res.body.data.documentTypes[i].fieldMeaning).toBeDefined();
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/documentType/:typeId (Get a specific document type)', () => {

    afterEach(clearDatabase);

    it('Wrong format type', async () => {

        const token = await initUser('john.doe')

        const wrongFormatIdList = [
            null,
            undefined,
            "id",
        ]

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .get(`/api/documentType/${wrongFormatId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong type with a good format', async () => {
        
        const token = await initUser('john.doe')
        
        const res = await request(app)
        .get(`/api/documentType/${-10}`)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).toEqual(404)
    })
    
    it('Normal usage', async () => {
        const typeId = await createDocumentType('affiche')

        const token = await initUser('john.doe')

        const documentType = await DocumentTypes.findOne({
            where: {
                typeId: typeId
            }
        })

        const res = await request(app)
            .get(`/api/documentType/${documentType?.typeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.documentType).toBeDefined();
        expect(res.body.data.documentType.type).toEqual(documentType?.type);
        expect(res.body.data.documentType.fieldNumber).toEqual(documentType?.fieldNumber);
        expect(res.body.data.documentType.fieldMeaning).toEqual(documentType?.fieldMeaning);
    })
})

// ! DONE
describe('ROUTE (POST): /api/documentType (Create new project note)', () => {

    afterEach(clearDatabase);

    const goodParams = {
        type: 'CE',
        fieldNumber: 3,
        fieldMeaning: "a|b|c",
    }

    it('Wrong type', async () => {
        
        const token = await initUser('john.doe')
        
        const wrongTypeList = [
            "",
            null,
            undefined,
            "TypeToooo" + "o".repeat(15) + "oLong",
        ]

        for (const wrongType of wrongTypeList) {
            const res = await request(app)
                .post("/api/documentType")
                .send({
                    documentType: {
                        ...goodParams,
                        type: wrongType,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong field number', async () => {
        
        const token = await initUser('john.doe')
        
        const wrongFieldNumberList = [
            "",
            null,
            undefined,
            -10,
            40,
        ]

        for (const wrongFieldNumber of wrongFieldNumberList) {
            const res = await request(app)
                .post("/api/documentType")
                .send({
                    documentType: {
                        ...goodParams,
                        fieldNumber: wrongFieldNumber,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Wrong field meaning', async () => {
        
        const token = await initUser('john.doe')
        
        const wrongFieldMeaningList = [
            "",
            null,
            undefined,
            "FieldMeaningToooo" + "o".repeat(90) + "oLong",
        ]

        for (const wrongFieldMeaning of wrongFieldMeaningList) {
            const res = await request(app)
                .post("/api/documentType")
                .send({
                    documentType: {
                        ...goodParams,
                        type: wrongFieldMeaning,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .post("/api/documentType")
            .send({
                documentType: {
                    ...goodParams,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.data.typeId).toBeDefined()

        const type = await DocumentTypes.findOne({
            where: {
                typeId: res.body.data.typeId
            }
        })

        expect(type?.typeId).toEqual(res.body.data.typeId)
        expect(type?.type).toEqual(goodParams.type)
        expect(type?.fieldMeaning).toEqual(goodParams.fieldMeaning)
        expect(type?.fieldNumber).toEqual(goodParams.fieldNumber)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/documentType/:id (Update document type)', () => {
    afterEach(clearDatabase);

    const goodParams = {
                type: 'CE',
                fieldNumber: 3,
                fieldMeaning: "a|b|c",
            }

    it('Wrong format typeId', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/documentType/${wrongParam}`)
                .send({
                    documentType: {
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong typeId', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/documentType/${-10}`)
            .send({
                documentType: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Wrong type', async () => {
        
        const token = await initUser('john.doe')

        const typeId = await createDocumentType("affiche")

        const wrongTypeList = [
            "",
            null,
            undefined,
            "TypeToooo" + "o".repeat(15) + "oLong",
        ]

        for (const wrongType of wrongTypeList) {
            const res = await request(app)
                .put(`/api/documentType/${typeId}`)
                .send({
                    documentType: {
                        ...goodParams,
                        type: wrongType
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })
    
    it('Wrong field number', async () => {
        
        const token = await initUser('john.doe')

        const typeId = await createDocumentType("affiche")

        const wrongFieldNumberList = [
            "",
            null,
            undefined,
            -10,
            40
        ]

        for (const wrongFieldNumber of wrongFieldNumberList) {
            const res = await request(app)
                .put(`/api/documentType/${typeId}`)
                .send({
                    documentType: {
                        ...goodParams,
                        fieldNumber: wrongFieldNumber
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong field meaning', async () => {
        
        const token = await initUser('john.doe')

        const typeId = await createDocumentType("affiche")

        const wrongFieldMeaningList = [
            "",
            null,
            undefined,
            "FieldMeaningToooo" + "o".repeat(90) + "oLong",
        ]

        for (const wrongFieldMeaning of wrongFieldMeaningList) {
            const res = await request(app)
                .put(`/api/documentType/${typeId}`)
                .send({
                    documentType: {
                        ...goodParams,
                        fieldMeaning: wrongFieldMeaning
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const typeId = await createDocumentType('affiche')

        const type = await DocumentTypes.findOne({
            where: {
                typeId: typeId
            }
        })

        expect(type?.typeId).toEqual(typeId)
        expect(type?.type).toEqual(documentTypes['affiche'].type)
        expect(type?.fieldNumber).toEqual(documentTypes['affiche'].fieldNumber)
        expect(type?.fieldMeaning).toEqual(documentTypes['affiche'].fieldMeaning)

        const res = await request(app)
            .put(`/api/documentType/${typeId}`)
            .send({
                documentType: {
                    ...goodParams,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)

        const updatedType = await DocumentTypes.findOne({
            where: {
                typeId: typeId
            }
        })

        expect(updatedType?.typeId).toEqual(typeId)
        expect(updatedType?.type).toEqual(goodParams.type)
        expect(updatedType?.fieldNumber).toEqual(goodParams.fieldNumber)
        expect(updatedType?.fieldMeaning).toEqual(goodParams.fieldMeaning)
    })  
})

// ! DONE
describe('ROUTE (DELETE): /api/documentType/:id (Delete document type)', () => {

    afterEach(clearDatabase);

    it('Wrong format typeId', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .delete(`/api/documentType/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong typeId (type not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .delete(`/api/documentType/${-10}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {

        const token = await initUser('john.doe')

        const typeId = await createDocumentType("affiche")

        const type = await DocumentTypes.findOne({
            where: {
                typeId: typeId
            }
        })

        expect(type).toBeTruthy()

        const res = await request(app)
            .delete(`/api/documentType/${typeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)

        const deletedType = await DocumentTypes.findOne({
            where: {
                typeId: typeId
            }
        })

        expect(deletedType).not.toBeTruthy()
    })

})