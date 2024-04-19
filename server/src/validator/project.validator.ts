// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidProject = (acronym: any, startDate: any, endDate: any) => {
    if (typeof acronym !== 'string') return { valid: 0, message: 'Your acronym is not correctly formatted.' }
    if (acronym.length < 2 || acronym.length >= 5) return { valid: 0, message: 'The size of your acronym is not valid' }
    if (!(startDate instanceof Date)) return { valid: 0, message: 'Your start date is not correctly formatted.' }
    if (!(endDate instanceof Date)) return { valid: 0, message: 'Your end date is not correctly formatted.' }

    return { valid: 1 }
}
