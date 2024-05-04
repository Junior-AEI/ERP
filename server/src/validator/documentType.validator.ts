// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidDocumentType = (type: any, fieldNumber: any, fieldMeaning: any) => {
    if (typeof type !== 'string') return { valid: 0, message: 'Your type is not correctly formatted.' }
    if (type.length < 1 || type.length >= 20) return { valid: 0, message: 'Your type size has to be bigger than 1 and smaller than 20.' }
    if (typeof fieldNumber !== 'number') return { valid: 0, message: 'Your field number is not correctly formatted.' }
    if (fieldNumber < 0 || fieldNumber > 15) return { valid: 0, message: 'Your field number is negative or too big.' }
    if (typeof fieldMeaning !== 'string') return { valid: 0, message: 'Your field meaning is not correctly formatted.' }
    if (fieldMeaning.length < 1 || fieldMeaning.length >= 100) return { valid: 0, message: 'Your field meaning size has to be bigger than 2 and smaller than 100.' }
    
    return { valid: 1 }
}
