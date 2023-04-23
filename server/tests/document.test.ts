import {
    describe,
    expect,
    test,
    beforeAll,
    afterEach,
    assertType,
} from "vitest";

import { createRequest, createResponse } from "node-mocks-http";

import request from "supertest";
import Fichier from "../src/models/fichier.model";
import Document from "../src/models/document.model";

import documentController from "../src/controller/document.controller";
import { sequelize, sequelizeInit } from "../src/config/database.config";

const baseURL = "http://localhost:5000/api";

describe("Test `Document` controller", () => {
    beforeAll(async () => {
        await sequelizeInit();
        sequelize.addModels([Document, Fichier]);
    });
    describe("createDocument controller", () => {
        test("Empty name", async () => {
            const expectedError = {
                message: "Validation error: Validation notEmpty on nom failed",
                status: 500,
            };
            const req = createRequest({ body: { nom: "" } });
            const res = createResponse();
            await documentController.createDocument(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toStrictEqual(expectedError);
        });
        test("Create Document", async () => {
            const name = "Test Document";
            const req = createRequest({ body: { nom: name } });
            console.log(req);
            const res = createResponse();
            await documentController.createDocument(req, res);
            expect(res._getJSONData().message).toBeUndefined();
            console.log(res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toBeDefined();
            const doc: Document[] = await Document.findAll({
                where: { nom: name },
            });
            expect(doc[0].nom).toBe(name);
            const trash = Document.findAll({ where: { nom: name } });
            (await trash).forEach((d) => d.destroy());
        });
    });
    describe("getAllDocuments controller", async () => {
        test("No documents in database", async () => {
            const req = createRequest();
            const res = createResponse();
            const trash = Document.findAll();
            (await trash).forEach((d) => d.destroy());
            await documentController.getAllDocuments(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toStrictEqual([]);
        });
        test("With documents", async () => {});
    });
    afterEach(async () => {
        const files = Fichier.findAll();
        (await files).forEach((d) => d.destroy());
        const docs = Document.findAll();
        (await docs).forEach((f) => f.destroy());
    });
});

describe("Test `Document` API", () => {
    let token = "";

    //get token for request
    beforeAll(async () => {
        const pres = {
            nomUtilisateur: "lorene.marques",
            motDePasse: "unmotdepassesuperfort",
        };
        const response = await request(baseURL).post("/login").send(pres);
        token = "Bearer " + response.body.token;
    });

    describe("GET / `document`", () => {
        test("GET / all `documents` ", async () => {
            const res = await request(baseURL)
                .get("/document")
                .set("Authorization", token);

            expect(res.statusCode).toBe(200);
            res.body.forEach((ele: Document) => {
                assertType<Document>(ele);
                ele.versions.forEach((v: Fichier) => {
                    assertType<Fichier>(v);
                });
            });
        });
    });
});
