import { describe, expect, test, beforeAll } from "vitest";
import request from "supertest";

const baseURL = "http://localhost:5000/api";
let token = "";

describe("utilisateur", () => {
    beforeAll(async () => {
        const pres = {
            nomUtilisateur: "lorene.marques",
            motDePasse: "unmotdepassesuperfort",
        };
        const response = await request(baseURL).post("/login").send(pres);
        token = "Bearer " + response.body.token;
    });

    test("GET / utilisateur by id ", async () => {
        const response = await request(baseURL)
            .get("/utilisateur")
            .set("Authorization", token);
        expect(response.statusCode).toBe(200);
    });

    test("person is defined", () => {
        expect(1 + 1).toBe(2);
    });
});
