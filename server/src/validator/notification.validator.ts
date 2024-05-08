import { PATHCONCERNED } from '../models/notification.model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidNotification = (title: any, description: any, pathConcerned: any) => {
    if (typeof description !== 'string') return { valid: 0, message: 'Your description is not correctly formatted.' }
    if (description.length < 1 || description.length >= 1000) return { valid: 0, message: 'The size of your description is not valid' }
    if (typeof title !== 'string') return { valid: 0, message: 'Your title is not correctly formatted.' }
    if (title.length < 1 || title.length >= 50) return { valid: 0, message: 'Your title size has to be bigger than 4.' }
    if (typeof pathConcerned !== 'string') return { valid: 0, message: 'Your path concerned is not correctly formatted.' }
    if (pathConcerned.length < 1 || pathConcerned.length >= 20) return { valid: 0, message: 'Your path concerned size has to be bigger than 8.' }
    if (PATHCONCERNED.indexOf(pathConcerned) < 0) return { valid: 0, message: 'Your path concerned is not define in PATHCONCERNED' }

    return { valid: 1 }
}
