// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidDocument = (path: any, version: any, information: any, status: any) => {
    if (typeof path !== 'string')
        return { valid: 0, message: 'Your path is not correctly formatted.' }
    if (path.length < 1 || path.length >= 30)
        return { valid: 0, message: 'The size of your path has to be smaller than 30' }
    if (typeof version !== 'number')
        return { valid: 0, message: 'Your version is not correctly formatted.' }
    if (typeof information !== 'string')
        return { valid: 0, message: 'Your information is not correctly formatted.' }
    if (information.length < 5 || information.length >= 80)
        return { valid: 0, message: 'Your information size has to be bigger than 5 and smaller than 80' }
    if (typeof status !== 'string')
        return { valid: 0, message: 'Your status is not correctly formatted.' }
    if (status.length < 2 || status.length >= 20)
        return { valid: 0, message: 'Your status size has to be bigger than 2 and smaller than 20' }

    return { valid: 1 }
}
