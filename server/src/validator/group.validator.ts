/* eslint-disable @typescript-eslint/no-explicit-any */
export const isValidGroup = (groupName: any) => {
    if (typeof groupName !== 'string')
        return { valid: 0, message: 'Your group name is not correctly formatted.' }
    if (groupName.length < 1 || groupName.length >= 40)
        return { valid: 0, message: 'The size of your group name is not valid' }

    return { valid: 1 }
}
