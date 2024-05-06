import { ADVANCEMENT } from "../models/projectNote.model"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidProjectNote = (comment: any, advancement: any) => {
    if (typeof comment !== 'string') return { valid: 0, message: 'Your comment is not correctly formatted.' }
    if (comment.length < 1 || comment.length >= 1000) return { valid: 0, message: 'The size of your comment is not valid' }
    if (typeof advancement !== 'string') return { valid: 0, message: 'Your advancement is not correctly formatted.' }
    if (advancement.length < 5 || advancement.length >= 20) return { valid: 0, message: 'Your advancement size has to be bigger than 5 and smaller than 20.' }
    if (ADVANCEMENT.indexOf(advancement) < 0 ) return {valid: 0, message: 'Your advancement is not define in ADVANCEMENT'}

    return { valid: 1 }
}
