import { STATE } from "../models/task.model"
import Users from "../models/user.model"
import { isValidDate } from "./utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidTask = (dueDate: any, description: any, state: any) => {
    if (typeof description !== 'string') return { valid: 0, message: 'Your description is not correctly formatted.' }
    if (description.length < 1 || description.length >= 200) return { valid: 0, message: 'The size of your description is not valid' }
    if (typeof state !== 'string') return { valid: 0, message: 'Your state is not correctly formatted.' }
    if (!(STATE.includes(state))) return { valid: 0, message: 'Your state size has to be bigger than 8.' }
    if (!(isValidDate(dueDate))) return { valid: 0, message: 'Your due date is not correctly formatted.' }
    return { valid: 1 }
}
