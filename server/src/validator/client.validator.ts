
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isValidClient = (fun: any) => {
    if (typeof fun !== 'string') return { valid: 0, message: 'Your function is not correctly formatted.' }
    if (fun.length < 1 || fun.length >= 50) return { valid: 0, message: 'Your function size has to be smaller than 50' }

    return { valid: 1 }
}
