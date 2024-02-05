import { describe, expect, test, beforeAll, assertType } from "vitest";
import request from "supertest";

const baseURL = "http://localhost:5000/api";
interface Company {
    [key: string]: any;
}

describe("Test `entreprise` model", () => {
    let token = "";

    const entrepriseAttributes: string[] = [
        "id",
        "nom",
        "entiteJuridique",
        "adresseId",
        "createdAt",
        "updatedAt",
    ];

    //get token for request
    beforeAll(async () => {
        const pres = {
            nomUtilisateur: "lorene.marques",
            motDePasse: "unmotdepassesuperfort",
        };
        const response = await request(baseURL).post("/login").send(pres);
        token = "Bearer " + response.body.token;
    });

    describe("GET / `entreprise`", () => {
        test("GET / all `entreprise` ", async () => {
            const response = await request(baseURL)
                .get("/entreprise")
                .set("Authorization", token);

            expect(response.statusCode).toBe(200);

            response.body.forEach((ele: Company) => {
                entrepriseAttributes.forEach((attribute) => {
                    expect(ele).toHaveProperty(attribute);
                    expect(ele[attribute]).toBeDefined();
                });
            });
        });

        test("GET / `entreprise` by id ", async () => {
            const response = await request(baseURL)
                .get("/entreprise/1")
                .set("Authorization", token);

            expect(response.statusCode).toBe(200);

            entrepriseAttributes.forEach((attribute) => {
                expect(response.body).toHaveProperty(attribute);
                expect(response.body[attribute]).toBeDefined();
            });
        });
    });

    describe("Modify database `entreprise`", () => {
        let idNewCompany: number;

        const newCompany: Company = {
            nom: "Test",
            entiteJuridique: "Asso",
            adresseId: 1,
        };

        describe("POST / Create company", () => {
            test("Create new `entreprise`  ", async () => {
                const response = await request(baseURL)
                    .post("/entreprise")
                    .set("Authorization", token)
                    .send(newCompany);

                //save id from response
                expect(response.body.id).toBeDefined();
                expect(response.body.id).not.toBeNull();
                assertType<number>(response.body.id);

                idNewCompany = response.body.id;

                // check response
                const checkResponse = await request(baseURL)
                    .get(`/entreprise/${idNewCompany}`)
                    .set("Authorization", token);

                entrepriseAttributes.forEach((attribute) => {
                    expect(checkResponse.body).toHaveProperty(attribute);
                    if (
                        attribute != "id" &&
                        attribute != "createdAt" &&
                        attribute != "updatedAt"
                    ) {
                        expect(checkResponse.body[attribute]).toBe(
                            newCompany[attribute],
                        );
                    } else {
                        expect(checkResponse.body[attribute]).toBeDefined();
                        expect(checkResponse.body[attribute]).not.toBeNull();
                    }
                });

                expect(response.statusCode).toBe(201);
            });

            test("Create already existing `entreprise`", async () => {
                const response = await request(baseURL)
                    .post("/entreprise")
                    .set("Authorization", token)
                    .send(newCompany);

                expect(response.statusCode).toBe(409);

                expect(response.body).toStrictEqual({
                    status: 409,
                    message: "Company already exist",
                });
            });
        });

        describe("PUT / Update `entreprise`", () => {
            test("Update existing `entreprise`", async () => {
                let updatedCompany = { ...newCompany };
                // If you add a non existing field in object and send request, it seems to work, a bit strange no ?
                updatedCompany.nom = "ManqueCruellement";
                updatedCompany.id = idNewCompany;

                const response = await request(baseURL)
                    .put("/entreprise")
                    .set("Authorization", token)
                    .send(updatedCompany);

                expect(response.statusCode).toBe(204);
                // check that the modification is done with get by id
                // check that createdAt is not modified and UpdatedAt is modified
            });

            test("Update `entreprise` with wrong id", async () => {
                let updatedCompany = { ...newCompany };
                updatedCompany.id = idNewCompany + 1;

                const response = await request(baseURL)
                    .put("/entreprise")
                    .set("Authorization", token)
                    .send(updatedCompany);

                expect(response.statusCode).toBe(404);

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist",
                });
            });
        });

        describe("DELETE / Delete `entreprise` ", () => {
            test("Delete existing `entreprise`", async () => {
                const response = await request(baseURL)
                    .delete(`/entreprise/${idNewCompany}`)
                    .set("Authorization", token);

                expect(response.statusCode).toBe(204);

                const checkResponse = await request(baseURL)
                    .get(`/entreprise/${idNewCompany}`)
                    .set("Authorization", token);

                expect(checkResponse.body).toBeNull();
            });

            test("Delete already deleted `entreprise`", async () => {
                const response = await request(baseURL)
                    .delete(`/entreprise/${idNewCompany}`)
                    .set("Authorization", token);

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist",
                });
            });
        });
    });
});
