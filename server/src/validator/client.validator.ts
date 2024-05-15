import { FIRSTCONTACTS } from "../models/client.model"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isValidClient = (fun: any, firstContact: any) => {
    if (!fun || !firstContact) return { valid: 0, message: 'Please fill all the fields.' }

    if (typeof fun !== 'string') return { valid: 0, message: 'Your function is not correctly formatted.' }
    if (fun.length < 1 || fun.length >= 50) return { valid: 0, message: 'Your function size has to be smaller than 50' }
    if (typeof firstContact !== 'string') return { valid: 0, message: 'Your first contact is not correctly formatted.' }
    if (firstContact.length < 5 || firstContact.length >= 50) return { valid: 0, message: 'Your function size has to be smaller than 50' }
    if (!FIRSTCONTACTS.includes(firstContact)) return { valid: 0, message: 'Your cfirst contact is not in FIRSTCONTACTS.' }

    return { valid: 1 }
}
