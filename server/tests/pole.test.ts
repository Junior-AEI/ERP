import { describe, expect, test, beforeAll } from "vitest";
import request from "supertest";

const baseURL = "http://localhost:5000/api";
interface Post {
    [key: string]: any;
}

describe("Test `pole` model", () => {
    let token = "";
    let randomName = "";

    const poleAttributes: string[] = ["nom", "createdAt", "updatedAt"];

    //get token for request
    beforeAll(async () => {
        const pres = {
            nomUtilisateur: "lorene.marques",
            motDePasse: "unmotdepassesuperfort",
        };
        const response = await request(baseURL).post("/login").send(pres);
        token = "Bearer " + response.body.token;
        randomName = "test" + Math.floor(Math.random() * 10000000);
        console.log(randomName);
    });

    describe("POST /", () => {
        test("create Pole", async () => {
            const response = await request(baseURL)
                .post("/pole")
                .set("Authorization", token)
                .send({
                    nom: randomName,
                });
            expect(response.statusCode).toBe(201);
        });

        test("create existing Pole", async () => {
            const response = await request(baseURL)
                .post("/pole")
                .set("Authorization", token)
                .send({
                    nom: "test",
                });
            expect(response.statusCode).toBe(409);
        });
    });

    describe("GET /", () => {
        test("get all Poles", async () => {
            const response = await request(baseURL)
                .get("/pole")
                .set("Authorization", token);

            expect(response.statusCode).toBe(200);

            response.body.forEach((ele: Post) => {
                poleAttributes.forEach((attribute) => {
                    expect(ele).toHaveProperty(attribute);
                    expect(ele[attribute]).toBeDefined();
                });
            });
            expect(response.body.map((ele: Post) => ele.nom)).toContain(
                randomName,
            );
        });
    });

    describe("GET /:nom", () => {
        test("get a Pole by name", async () => {
            const response = await request(baseURL)
                .get(`/pole/${randomName}`)
                .set("Authorization", token);

            expect(response.statusCode).toBe(200);

            poleAttributes.forEach((attribute) => {
                expect(response.body).toHaveProperty(attribute);
                expect(response.body[attribute]).toBeDefined();
            });
        });
    });

    describe("DELETE /:nom", () => {
        test("delete a Pole by name", async () => {
            const response = await request(baseURL)
                .delete(`/pole/${randomName}`)
                .set("Authorization", token);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe(`Pole ${randomName} deleted`);
        });
    });
});
