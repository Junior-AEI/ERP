import request from 'supertest'
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { createToken } from './seeders/token.seeders'
import { initUser } from './seeders/general'
import { createTask } from "./seeders/tasks.seeders"
import { createUser } from "./seeders/user.seeders"
import Tasks from "../src/models/task.model"
import { tasks } from "./seeders/data/tasks.data"

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/task (Get all tasks)', () => {

    afterEach(clearDatabase);

    it('Normal usage', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        await createTask('task_1', johnId, janeId)
        await createTask('task_2', johnId, janeId)
        await createTask('task_3', johnId, janeId)
        await createTask('task_4', johnId, janeId)
        await createTask('task_5', johnId, janeId)

        const token = await createToken("john.doe");

        const res = await request(app)
            .get('/api/task')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.tasks.length).toEqual(5);

        for (let i = 0; i < 5; i++) {
            expect(res.body.data.tasks[i].taskId).toBeDefined();
            expect(res.body.data.tasks[i].userId).toBeDefined();
            expect(res.body.data.tasks[i].dueDate).toBeDefined();
            expect(res.body.data.tasks[i].description).toBeDefined();
            expect(res.body.data.tasks[i].state).toBeDefined();
            expect(res.body.data.tasks[i].issuerId).toBeDefined();
        }

    })

})

// ! DONE
describe('ROUTE (GET): /api/task/:task (Get a specific task)', () => {

    afterEach(clearDatabase);

    it('Wrong format', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongParamId"
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .get(`/api/task/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong taskId with a good format', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .get(`/api/task/${-10}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const taskId = await createTask('task_1', johnId, janeId)

        const task = await Tasks.findOne({
            where: {
                taskId: taskId,
            }
        })

        const token = await createToken("john.doe");

        const res = await request(app)
            .get(`/api/task/${task?.taskId}`)
            .set('Authorization', `Bearer ${token}`);


        expect(res.status).toEqual(200)
        expect(res.body.data.task).toBeDefined();
        expect(res.body.data.task.taskId).toEqual(task?.taskId);
        expect(res.body.data.task.userId).toEqual(johnId)
        expect(res.body.data.task.dueDate).toEqual(tasks["task_1"].dueDate)
        expect(res.body.data.task.description).toEqual(tasks["task_1"].description)
        expect(res.body.data.task.state).toEqual(tasks["task_1"].state)
        expect(res.body.data.task.issuerId).toEqual(janeId)

    })

})

// ! DONE
describe('ROUTE (GET): /api/byUser/:taskUser (Get all tasks for a specific user)', () => {

    afterEach(clearDatabase);

    it('Wrong format', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongParamId"
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .get(`/api/task/byUser/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Normal usage', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        await createTask('task_1', janeId, johnId)
        await createTask('task_2', janeId, johnId)
        await createTask('task_3', janeId, johnId)

        const token = await createToken("john.doe");

        const res_1 = await request(app)
            .get(`/api/task/byUser/${janeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res_1.status).toEqual(200)
        expect(res_1.body.data.tasks).toBeDefined();
        expect(res_1.body.data.tasks.length).toEqual(3);


        const res_2 = await request(app)
            .get(`/api/task/byUser/${johnId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res_2.status).toEqual(200)
        expect(res_2.body.data.tasks.length).toEqual(0);



        await createTask('task_4', johnId, janeId)
        await createTask('task_5', johnId, janeId)

        const res_3 = await request(app)
            .get(`/api/task/byUser/${johnId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res_3.status).toEqual(200)
        expect(res_3.body.data.tasks).toBeDefined();
        expect(res_3.body.data.tasks.length).toEqual(2);


    })

})

// ! DONE
describe('ROUTE (POST): /api/task (Create new task)', () => {

    afterEach(clearDatabase);

    const goodParams = {
        dueDate: new Date(),
        description: 'Nouvelle description',
    }

    it('Wrong dueDate', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const token = await createToken('john.doe')

        const wrongParamList = [
            "",
            "Wrong Date",
            null,
            undefined,
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post("/api/task")
                .send({
                    task: {
                        ...goodParams,
                        dueDate: wrongParam,
                        userId: johnId,
                        issuerId: janeId,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong description', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const token = await createToken('john.doe')

        const wrongParamList = [
            "",
            "descriptionTooBiggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
            null,
            undefined,
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post("/api/task")
                .send({
                    task: {
                        ...goodParams,
                        description: wrongParam,
                        userId: johnId,
                        issuerId: janeId,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong userId', async () => {

        const johnId = await createUser('john.doe')

        const token = await createToken('john.doe')

        const wrongParamList = [
            "",
            null,
            undefined,
            1000
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post("/api/task")
                .send({
                    task: {
                        ...goodParams,
                        description: wrongParam,
                        userId: wrongParam,
                        issuerId: johnId,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong issuerId', async () => {

        const johnId = await createUser('john.doe')

        const token = await createToken('john.doe')

        const wrongParamList = [
            "",
            null,
            undefined,
            1000
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post("/api/task")
                .send({
                    task: {
                        ...goodParams,
                        description: wrongParam,
                        userId: johnId,
                        issuerId: wrongParam,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const token = await createToken('john.doe')

        const res = await request(app)
            .post("/api/task")
            .send({
                task: {
                    ...goodParams,
                    userId: janeId,
                    issuerId: johnId,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.data.taskId).toBeDefined()

        const task = await Tasks.findOne({
            where: {
                taskId: res.body.data.taskId
            }
        })

        expect(task?.taskId).toEqual(res.body.data.taskId)
        expect(task?.dueDate).toEqual(goodParams.dueDate)
        expect(task?.description).toEqual(goodParams.description)
        expect(task?.state).toEqual("A faire")

    })

})

// ! DONE
describe('ROUTE (PUT): /api/task/:id (Update task)', () => {

    afterEach(clearDatabase);

    const goodParams = {
        dueDate: new Date(),
        description: 'Nouvelle description',
        state: 'Terminée'
    }

    it('Wrong format', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongParamId"
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/task/${wrongParam}`)
                .send({
                    task: {
                        ...goodParams,
                    }
                })
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong taskId with a good format', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/task/${-10}`)
            .send({
                task: {
                    ...goodParams,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(404)
    })

    it('Wrong dueDate', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const taskId = await createTask('task_1', johnId, janeId)

        const token = await createToken('john.doe')

        const wrongParamList = [
            "",
            "Wrong Date",
            null,
            undefined,
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/task/${taskId}`)
                .send({
                    task: {
                        ...goodParams,
                        dueDate: wrongParam,
                        userId: johnId,
                        issuerId: janeId,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong description', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const taskId = await createTask('task_1', johnId, janeId)

        const token = await createToken('john.doe')

        const wrongParamList = [
            "",
            "descriptionTooBiggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
            null,
            undefined,
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/task/${taskId}`)
                .send({
                    task: {
                        ...goodParams,
                        description: wrongParam,
                        userId: johnId,
                        issuerId: janeId,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong state', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const taskId = await createTask('task_1', johnId, janeId)

        const token = await createToken('john.doe')

        const wrongParamList = [
            "",
            "Bad state",
            null,
            undefined,
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/task/${taskId}`)
                .send({
                    task: {
                        ...goodParams,
                        state: wrongParam,
                        userId: johnId,
                        issuerId: janeId,
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const taskId = await createTask('task_1', johnId, janeId)

        const token = await createToken('john.doe')

        const task = await Tasks.findOne({
            where: {
                taskId: taskId
            }
        })

        expect(task?.taskId).toEqual(taskId)
        expect(task?.dueDate).toEqual(new Date(tasks['task_1'].dueDate))
        expect(task?.description).toEqual(tasks['task_1'].description)
        expect(task?.state).toEqual(tasks['task_1'].state)
        expect(task?.userId).toEqual(johnId)
        expect(task?.issuerId).toEqual(janeId)

        const res = await request(app)
            .put(`/api/task/${taskId}`)
            .send({
                task: {
                    ...goodParams,
                    userId: janeId,
                    issuerId: johnId,
                }
            })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200) 

        const updatedTask = await Tasks.findOne({
            where: {
                taskId: taskId
            }
        })

        expect(updatedTask?.taskId).toEqual(taskId)
        expect(updatedTask?.dueDate).toEqual(goodParams.dueDate)
        expect(updatedTask?.description).toEqual(goodParams.description)
        expect(updatedTask?.state).toEqual(goodParams.state)
        expect(updatedTask?.userId).toEqual(janeId)
        expect(updatedTask?.issuerId).toEqual(johnId)

    })


})

// ! DONE
describe('ROUTE (DELETE): /api/task/:id (Delete task)', () => {

    afterEach(clearDatabase);

        it('Wrong format', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongParamId"
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .delete(`/api/task/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong taskId with a good format', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .delete(`/api/task/${-10}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(404)
    })

    it('Wrong format taskId', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongPersonIdFormat",
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .delete(`/api/person/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong personId (person not found)', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .delete(`/api/person/${-10}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {

        const johnId = await createUser('john.doe')
        const janeId = await createUser('jane.doe')

        const taskId = await createTask('task_1', johnId, janeId)

        const token = await createToken('john.doe')

        const task = await Tasks.findOne({
            where: {
                taskId: taskId
            }
        })

        expect(task).toBeTruthy()

        const res = await request(app)
            .delete(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)

        const deletedTask = await Tasks.findOne({
            where: {
                taskId: taskId
            }
        })

        expect(deletedTask).not.toBeTruthy()
    })

})