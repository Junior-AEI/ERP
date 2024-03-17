import { describe, expect, test, beforeAll, afterEach, assertType } from 'vitest'
import { createRequest, createResponse } from 'node-mocks-http'
import request from 'supertest'

require('ts-node/register')

import { sequelize, sequelizeInit } from '../src/config/database.config'
import Fichier from '../src/models/fichier.model'
import Document from '../src/models/document.model'
import documentController from '../src/controller/document.controller'

describe('Test `Document` controller', () => {
    beforeAll(async () => {
        await sequelizeInit()
        sequelize.addModels([Document, Fichier])
    })
    describe('createDocument controller', () => {
        test('Empty name', async () => {
            const expectedError = {
                message: 'Validation error: Validation notEmpty on nom failed',
                status: 500
            }
            const req = createRequest({ body: { nom: '' } })
            const res = createResponse()
            await documentController.createDocument(req, res)
            expect(res.statusCode).toBe(500)
            expect(res._getJSONData()).toStrictEqual(expectedError)
        })
        test('Create Document', async () => {
            const name = 'Test Document'
            const req = createRequest({ body: { nom: name } })
            const res = createResponse()
            await documentController.createDocument(req, res)
            expect(res._getJSONData().message).toBeUndefined()
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toBeDefined()
            const doc: Document[] = await Document.findAll({
                where: { nom: name }
            })
            expect(doc[0].nom).toBe(name)
            const trash = Document.findAll({ where: { nom: name } })
            ;(await trash).forEach((d) => d.destroy())
        })
    })
    describe('getAllDocuments controller', async () => {
        test('With documents', async () => {
            const req = createRequest()
            const res = createResponse()
            await documentController.getAllDocuments(req, res)
            expect(res.statusCode).toBe(200)
            const docs = res._getJSONData()
            expect(docs[0].id).toStrictEqual(2)
            expect(docs[1].id).toStrictEqual(1)
            expect(docs[0].versions[0].id).toStrictEqual(0)
            expect(docs[1].versions[0].id).toStrictEqual(3)
            expect(docs[1].versions[1].id).toStrictEqual(1)
        })
    })
    afterEach(async () => {
        //(await import("../src/migrations/umzug")).seeder.up();
    })
})

describe('Test `Document` API', () => {
    let token = ''

    //get token for request
    beforeAll(async () => {
        const pres = {
            nomUtilisateur: 'lorene.marques',
            motDePasse: 'unmotdepassesuperfort'
        }
        const response = await request(process.env.VITE_API_URL).post('/login').send(pres)
        token = 'Bearer ' + response.body.token
    })

    describe('GET / `document`', () => {
        test('GET / all `documents` ', async () => {
            const res = await request(process.env.VITE_API_URL)
                .get('/document')
                .set('Authorization', token)

            expect(res.statusCode).toBe(200)
            res.body.forEach((ele: Document) => {
                assertType<Document>(ele)
                ele.versions.forEach((v: Fichier) => {
                    assertType<Fichier>(v)
                })
            })
        })
    })
})
