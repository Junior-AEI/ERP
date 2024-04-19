// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidEvent = (name: any, startDate: any, endDate: any, location: any, description: any) => {
    if (typeof name !== 'string') return { valid: 0, message: 'Your name is not correctly formatted.' }
    if (name.length < 3 || name.length >= 30) return { valid: 0, message: 'The size of your name is not valid' }
    if (!(startDate instanceof Date)) return { valid: 0, message: 'Your start date is not correctly formatted.' }
    if (!(endDate instanceof Date)) return { valid: 0, message: 'Your end date is not correctly formatted.' }
    if (typeof location !== 'string') return { valid: 0, message: 'Your location is not correctly formatted.' }
    if (location.length < 1 || location.length >= 30) return { valid: 0, message: 'Your location size has to be bigger than 1 and smaller than 30.' }
    if (typeof description !== 'string') return { valid: 0, message: 'Your description is not correctly formatted.' }
    if (description.length < 1 || description.length >= 100) return { valid: 0, message: 'Your description size has to be bigger than 1 and smaller than 100.' }

    return { valid: 1 }
}
