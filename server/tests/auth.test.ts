const request = require('supertest')
import { sequelizeInit, sequelizeClose } from '../src/config/database.config'
import bcrypt from 'bcrypt'
import app from "../src/app";
import { createUser } from './seeders/user.seeders';
import { clearDatabase } from './utils';
import Tokens from '../src/models/token.model';
import Users from '../src/models/user.model';
import { promisify } from 'util';

beforeAll(async () => {
    await sequelizeInit()
});

afterAll(async () => {
    await sequelizeClose();
});

describe('ROUTE: /api/login', () => {

    afterEach(clearDatabase);

    it('Wrong informations', async () => {

        await createUser();

        const wrongInformationsList = [
            // Void
            {
                username: null,
                password: null,
            },
            // Empty
            {
                username: "",
                password: "",
            },
            // Wrong
            {
                username: "john",
                password: "123",
            },
            // wrong password
            {
                username: "john.doe",
                password: "wrong_mdp",
            },
            // ...
        ]

        wrongInformationsList.map(async (wrongInformations) => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    username: wrongInformations.username,
                    password: wrongInformations.password
                })
            expect(res.status).toEqual(401);
            expect(res.body.status).toEqual("error");
        })

    })

    it('Good usage', async () => {

        await createUser();

        const res = await request(app)
            .post('/api/login')
            .send({
                username: "john.doe",
                password: 'mdp'
            })
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual("success");
        expect(res.body.data.token).toBeDefined();

    })

})


describe('ROUTE: /api/forget', () => {

    afterEach(clearDatabase);

    it('Wrong username', async () => {

        const wrongUsernameList = [
            null, // Void
            "", // Empty
            "john.doe", // Filled
            // ...
        ]

        wrongUsernameList.map(async (wrongUsername) => {
            const res = await request(app)
                .post('/api/forget')
                .send({
                    username: wrongUsername,
                })
            expect(res.status).toEqual(404);
            expect(res.body.status).toEqual("error");
        })

    })

    it('Good usage', async () => {

        await createUser();

        const res = await request(app)
            .post('/api/forget')
            .send({
                username: "john.doe",
            })

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual("success");
        expect(res.body.data.token).toBeDefined();

        const user = await Users.findOne({
            where: {
                username: "john.doe"
            }
        })

        const tokenDb = await Tokens.findOne({
            where: {
                userId: user?.userId
            }
        })

        // Token has been recorded in the db
        expect(res.body.data.token).toEqual(tokenDb?.token);

    })

})

describe('ROUTE: /api/new-password', () => {

    afterEach(clearDatabase);

    // ! 
    // it('Wrong informations', async () => {

    //     await createUser();

    //     const wrongInformationsList = [
    //         // Void
    //         {
    //             token: null,
    //             newPassword: null,
    //         },
    //         // Empty
    //         {
    //             token: "",
    //             newPassword: "",
    //         },
    //         // Wrong token
    //         {
    //             token: "wrongToken",
    //             newPassword: "randomPassword",
    //         },
    //         // ...
    //         // TODO : Bad new passwords 
    //     ]

    //     wrongInformationsList.map(async (wrongInformations) => {
    //         const res = await request(app)
    //             .post('/api/new-password')
    //             .send(wrongInformations)
    //         expect(res.body.status).toEqual("error");
    //     })

    // })
    // ! 

    it('Good usage', async () => {

        await createUser();

        let user = await Users.findOne({
            where: {
                username: "john.doe"
            }
        })

        const oldPasswordHash = user?.password ? user.password : ""

        expect(await promisify(bcrypt.compare)('mdp', oldPasswordHash)).toBeTruthy();
        
        const token = "123456789randomTokenAZERTY"
        const currentDate = new Date()
        const tenMinutesLater = new Date(currentDate.getTime() + 10 * 60000)
        
        await Tokens.create({
            token: token,
            validity: tenMinutesLater,
            userId: user?.userId
        })
        
        const res = await request(app)
        .post('/api/new-password')
        .send({
            token: token,
            password: "validPassword",
        })
        
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual("success");
        
        user = await Users.findOne({
            where: {
                username: "john.doe"
            }
        })
        
        const newPasswordHash = user?.password ? user.password : ""
        
        expect(newPasswordHash).not.toEqual(oldPasswordHash)
        expect(await promisify(bcrypt.compare)('mdp', newPasswordHash)).toBeFalsy();
        expect(await promisify(bcrypt.compare)('validPassword', newPasswordHash)).toBeTruthy();
        
    })

})




