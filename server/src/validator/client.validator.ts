import { isNumber } from '../controller/utils.controller'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isValidClient = (fun: any, companyId: any) => {
    if (typeof fun !== 'string') return { valid: 0, message: 'Your function is not correctly formatted.' }
    if (fun.length >= 50) return { valid: 0, message: 'Your function size has to be smaller than 50' }
    if (!isNumber(companyId)) return { valid: 0, message: 'The company id is not correctly formatted.' }

    return { valid: 1 }
}
