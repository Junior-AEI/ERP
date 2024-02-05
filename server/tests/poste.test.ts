import { describe, expect, test, beforeAll, assertType } from "vitest";
import request from "supertest";

const baseURL = "http://localhost:5000/api";
interface Post {
    [key: string]: any;
}

describe("Test `poste` model", () => {
    let token = "";

    const posteAttributes: string[] = [
        "id",
        "nom",
        "description",
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

    describe("GET / `poste`", () => {
        test("GET / all `poste` ", async () => {
            const response = await request(baseURL)
                .get("/poste")
                .set("Authorization", token);

            expect(response.statusCode).toBe(200);

            response.body.forEach((ele: Post) => {
                posteAttributes.forEach((attribute) => {
                    expect(ele).toHaveProperty(attribute);
                    expect(ele[attribute]).toBeDefined();
                });
            });
        });

        test("GET / `poste` by id ", async () => {
            const response = await request(baseURL)
                .get("/poste/1")
                .set("Authorization", token);

            expect(response.statusCode).toBe(200);

            posteAttributes.forEach((attribute) => {
                expect(response.body).toHaveProperty(attribute);
                expect(response.body[attribute]).toBeDefined();
            });
        });
    });

    describe("Modify database `poste`", () => {
        let idNewPost: number;

        const newPost: Post = {
            nom: "Comptable",
            description:
                "Responsable de la comptabilité de la Junior-Entreprise",
        };

        describe("POST / Create user", () => {
            test("Create new `poste`  ", async () => {
                const response = await request(baseURL)
                    .post("/poste")
                    .set("Authorization", token)
                    .send(newPost);

                //save id from response
                expect(response.body.id).toBeDefined();
                expect(response.body.id).not.toBeNull();
                assertType<number>(response.body.id);

                idNewPost = response.body.id;

                // check response
                const checkResponse = await request(baseURL)
                    .get(`/poste/${idNewPost}`)
                    .set("Authorization", token);

                posteAttributes.forEach((attribute) => {
                    expect(checkResponse.body).toHaveProperty(attribute);
                    if (
                        attribute != "id" &&
                        attribute != "createdAt" &&
                        attribute != "updatedAt"
                    ) {
                        expect(checkResponse.body[attribute]).toBe(
                            newPost[attribute],
                        );
                    } else {
                        expect(checkResponse.body[attribute]).toBeDefined();
                        expect(checkResponse.body[attribute]).not.toBeNull();
                    }
                });

                expect(response.statusCode).toBe(201);
            });

            test("Create already existing `poste`", async () => {
                const response = await request(baseURL)
                    .post("/poste")
                    .set("Authorization", token)
                    .send(newPost);

                expect(response.statusCode).toBe(409);

                expect(response.body).toStrictEqual({
                    status: 409,
                    message: "Post already exist",
                });
            });
        });

        describe("PUT / Update `poste`", () => {
            test("Update existing `poste`", async () => {
                let updatedPost = { ...newPost };
                // If you add a non existing field in object and send request, it seems to work, a bit strange no ?
                updatedPost.nom = "Tresorier";
                updatedPost.id = idNewPost;

                const response = await request(baseURL)
                    .put("/poste")
                    .set("Authorization", token)
                    .send(updatedPost);

                expect(response.statusCode).toBe(204);

                // check that createdAt is not modified and UpdatedAt is modified
            });

            test("Update `poste` with wrong id", async () => {
                let updatedUser = { ...newPost };
                updatedUser.id = idNewPost + 1;

                const response = await request(baseURL)
                    .put("/poste")
                    .set("Authorization", token)
                    .send(updatedUser);

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist",
                });
            });
        });

        describe("DELETE / Delete `poste` ", () => {
            test("Delete existing `poste`", async () => {
                const response = await request(baseURL)
                    .delete(`/poste/${idNewPost}`)
                    .set("Authorization", token);

                expect(response.statusCode).toBe(204);

                const checkResponse = await request(baseURL)
                    .get(`/poste/${idNewPost}`)
                    .set("Authorization", token);

                expect(checkResponse.body).toBeNull();
            });

            test("Delete already deleted `poste`", async () => {
                const response = await request(baseURL)
                    .delete(`/poste/${idNewPost}`)
                    .set("Authorization", token);

                expect(response.body).toStrictEqual({
                    status: 404,
                    message: "Wrong id or item doesn't exist",
                });
            });
        });
    });
});
