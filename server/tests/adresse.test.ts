import { describe, expect, test, beforeAll, assertType } from "vitest";
import request from "supertest";

const baseURL = "http://localhost:5000/api";
interface Address {
    [key: string]: any;
}

describe("Test `adresse` model", () => {
    let token = "";

    const adresseAttributes: string[] = [
        "id",
        "adresse",
        "complementAdresse",
        "ville",
        "codePostal",
        "pays",
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

    describe("GET / address", () => {
        test("GET / all `adresse` ", async () => {
            const response = await request(baseURL)
                .get("/adresse")
                .set("Authorization", token);

            expect(response.statusCode).toBe(200);

            response.body.forEach((ele: Address) => {
                adresseAttributes.forEach((attribute) => {
                    expect(ele).toHaveProperty(attribute);
                    expect(ele[attribute]).toBeDefined();
                });
            });
        });

        test("GET / `adresse` by id ", async () => {
            const response = await request(baseURL)
                .get("/adresse/1")
                .set("Authorization", token);

            expect(response.statusCode).toBe(200);

            adresseAttributes.forEach((attribute) => {
                expect(response.body).toHaveProperty(attribute);
                expect(response.body[attribute]).toBeDefined();
            });
        });
    });

    describe("Modify database `adresse`", () => {
        let idNewAddress: number;

        const newAddress: Address = {
            adresse: "222 rue des tulipes",
            complementAdresse: "sddfgh",
            ville: "Québec",
            codePostal: "33600",
            pays: "FRA",
        };

        describe("POST / Create user", () => {
            test("Create new `adresse`  ", async () => {
                const response = await request(baseURL)
                    .post("/adresse")
                    .set("Authorization", token)
                    .send(newAddress);

                //save id from response
                expect(response.body.id).toBeDefined();
                expect(response.body.id).not.toBeNull();
                assertType<number>(response.body.id);

                idNewAddress = response.body.id;

                // check response
                const checkResponse = await request(baseURL)
                    .get(`/adresse/${idNewAddress}`)
                    .set("Authorization", token);

                adresseAttributes.forEach((attribute) => {
                    expect(checkResponse.body).toHaveProperty(attribute);
                    if (
                        attribute != "id" &&
                        attribute != "createdAt" &&
                        attribute != "updatedAt" &&
                        attribute != "codePostal"
                    ) {
                        expect(checkResponse.body[attribute]).toBe(
                            newAddress[attribute],
                        );
                    }
                    if (attribute == "codePostal") {
                        // expect(checkResponse.body[attribute]).toBe(
                        //     newAddress[attribute].toString()
                        // );
                    } else {
                        expect(checkResponse.body[attribute]).toBeDefined();
                        expect(checkResponse.body[attribute]).not.toBeNull();
                    }
                });

                expect(response.statusCode).toBe(201);
            });

            test("Create already existing address", async () => {
                const response = await request(baseURL)
                    .post("/adresse")
                    .set("Authorization", token)
                    .send(newAddress);

                expect(response.statusCode).toBe(409);

                expect(response.body).toStrictEqual({
                    status: 409,
                    message: "Address already exist",
                });
            });
        });

        describe("PUT / Update `adresse`", () => {
            test("Update existing `adresse`", async () => {
                let updatedAddress = { ...newAddress };
                updatedAddress.pays = "CAN";
                updatedAddress.id = idNewAddress;

                const response = await request(baseURL)
                    .put("/adresse")
                    .set("Authorization", token)
                    .send(updatedAddress);

                expect(response.statusCode).toBe(204);

                // check that createdAt is not modified and UpdatedAt is modified
            });

            test("Update `adresse` with wrong id", async () => {
                let updatedUser = { ...newAddress };
                updatedUser.id = idNewAddress + 1;

                const response = await request(baseURL)
                    .put("/adresse")
                    .set("Authorization", token)
                    .send(updatedUser);

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist",
                });
            });
        });

        describe("DELETE / Delete `adresse` ", () => {
            test("Delete existing `adresse`", async () => {
                const response = await request(baseURL)
                    .delete(`/adresse/${idNewAddress}`)
                    .set("Authorization", token);

                expect(response.statusCode).toBe(204);

                const checkResponse = await request(baseURL)
                    .get(`/adresse/${idNewAddress}`)
                    .set("Authorization", token);

                expect(checkResponse.body).toBeNull();
            });

            test("Delete already deleted `adresse`", async () => {
                const response = await request(baseURL)
                    .delete(`/adresse/${idNewAddress}`)
                    .set("Authorization", token);

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist",
                });
            });
        });
    });
});
