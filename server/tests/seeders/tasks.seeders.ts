import Tasks from '../../src/models/task.model'
import { tasks } from './data/tasks.data'

export const createTask = async (taskname: string, userId: number, issuerId: number) => {
    const task = await Tasks.create({
        dueDate: tasks[taskname].dueDate,
        description: tasks[taskname].description,
        state: tasks[taskname].state,
        userId: userId,
        issuerId: issuerId
    })
    return task.taskId
}


