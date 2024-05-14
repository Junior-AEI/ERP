import { STATUS, type Status } from '../models/document.model'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isValidDocument = (name: any, path: any, version: any, information: any, status: Status) => {
    if (name === undefined || path === undefined || version === undefined || information === undefined || status === undefined) return { valid: 0, message: 'Please fill all the fields.' }

    if (typeof name !== 'string') return { valid: 0, message: 'Your name is not correctly formatted.' }
    if (name.length < 1 || name.length >= 50) return { valid: 0, message: 'The size of your name has to be smaller than 50' }
    if (typeof path !== 'string') return { valid: 0, message: 'Your path is not correctly formatted.' }
    if (path.length < 1 || path.length >= 256) return { valid: 0, message: 'The size of your path has to be smaller than 256' }
    if (typeof version !== 'number') return { valid: 0, message: 'Your version is not correctly formatted.' }
    if (version < 0) return { valid: 0, message: 'Your version has to be positiv.' }
    if (typeof information !== 'string') return { valid: 0, message: 'Your information is not correctly formatted.' }
    if (information.length < 1 || information.length >= 100)
        return {
            valid: 0,
            message: 'Your information size has to be bigger than 5 and smaller than 100'
        }
    if (typeof status !== 'string') return { valid: 0, message: 'Your status is not correctly formatted.' }
    if (status.length < 2 || status.length >= 20) return { valid: 0, message: 'Your status size has to be bigger than 2 and smaller than 20' }
    if (!STATUS.includes(status)) return { valid: 0, message: 'Your status must be in the enum : STATUS.' }

    return { valid: 1 }
}
