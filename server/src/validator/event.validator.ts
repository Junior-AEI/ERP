import { isValidDate } from "./utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidEvent = (name: any, startDate: any, endDate: any, location: any, description: any, eventTypeName: any) => {
    const EVENTTYPES = ['Congrès', 'Afterwork', 'Réunion', 'CA', 'RDI', 'Formation', 'RDV client', 'Audit', 'Autre'];
    if (typeof name !== 'string') return { valid: 0, message: 'Your name is not correctly formatted.' }
    if (name.length < 3 || name.length >= 64) return { valid: 0, message: 'The size of your name is not valid' }
    if (!startDate) return { valid: 0, message: 'Your start date has to be defined.' }
    if (!isValidDate(startDate)) return { valid: 0, message: 'Your start date is not correctly formatted.' }
    if (!endDate) return { valid: 0, message: 'Your end date has to be defined.' }
    if (!isValidDate(endDate)) return { valid: 0, message: 'Your end date is not correctly formatted.' }
    if (new Date(startDate) > new Date(endDate)) return { valid: 0, message: 'Your start date has to be before your end date.' }
    if (typeof location !== 'string') return { valid: 0, message: 'Your location is not correctly formatted.' }
    if (location.length < 1 || location.length >= 30) return { valid: 0, message: 'Your location size has to be bigger than 1 and smaller than 30.' }
    if (typeof description !== 'string') return { valid: 0, message: 'Your description is not correctly formatted.' }
    if (!eventTypeName) return { valid: 0, message: 'Your event type has to be defined.' }
    if (!EVENTTYPES.includes(eventTypeName)) return { valid: 0, message: 'Your event type is not correctly formatted.' }
    if (description.length < 1 || description.length >= 512) return { valid: 0, message: 'Your description size has to be bigger than 1 and smaller than 512.' }

    return { valid: 1 }
}
