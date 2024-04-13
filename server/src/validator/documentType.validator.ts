// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidDocumentType = (fieldNumber: any, fieldMeaning: any) => {
    if (typeof fieldNumber !== 'number') return { valid: 0, message: 'Your field number is not correctly formatted.' }
    if (typeof fieldMeaning !== 'string') return { valid: 0, message: 'Your field meaning is not correctly formatted.' }
    if (fieldMeaning.length < 1 || fieldMeaning.length >= 100) return { valid: 0, message: 'Your password size has to be bigger than 2 and smaller than 100.' }
    
    return { valid: 1 }
}
