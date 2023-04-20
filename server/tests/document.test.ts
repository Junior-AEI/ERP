import { describe, expect, test, beforeAll, assertType } from "vitest";
import { mockRequest, mockResponse } from "./expressMock";
import request from "supertest";
import Fichier from "../src/models/fichier.model";
import Document from "../src/models/document.model";

import documentController from "../src/controller/document.controller";

const baseURL = "http://localhost:5000/api";

describe("Test `Document` controller", () => {
    describe("createDocument controller", () => {
        test("Empty name", async () => {
            const name = "";
            const expectedError = {
                message: "notNull Violation: Document.nom cannot be null",
                status: 500,
            };
            const req = mockRequest({ nom: name });
            const res = mockResponse();
            await documentController.createDocument(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expectedError);
        });
        test("Create Document", async () => {
            const name = "Test Document";
            const req = mockRequest({}, { nom: name });
            const res = mockResponse();
            await documentController.createDocument(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            //const doc = await Document.findAll({ where: { nom: name } });
            //expect(doc).toBe("");
            //const trash = Document.findAll({ where: { nom: name } });
            //(await trash).forEach((d) => d.destroy());
        });
    });
    test("getAllDocuments controller", async () => {
        const req = mockRequest();
        const res = mockResponse();
        await documentController.getAllDocuments(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
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
