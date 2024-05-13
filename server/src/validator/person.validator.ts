// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidPerson = (lastname: any, firstname: any, gender: any, mobilePhone: any, email: any, landlinePhone: any) => {
    if (typeof lastname !== 'string') return { valid: 0, message: 'Your lastname is not correctly formatted.' }
    if (lastname.length < 1 || lastname.length >= 20) return { valid: 0, message: 'The size of your lastname is not valid' }
    if (typeof firstname !== 'string') return { valid: 0, message: 'Your firstname is not correctly formatted.' }
    if (firstname.length < 1 || firstname.length >= 20) return { valid: 0, message: 'The size of your firstname is not valid' }

    const phoneRegex: RegExp = /^\+\d{1,3}\s?\d{1,14}$/
    if (!phoneRegex.test(mobilePhone)) return { valid: 0, message: 'Your mobilePhone is not correcly formatted.' }

    if (landlinePhone !== undefined) {
        const phoneRegex: RegExp = /^\+\d{1,3}\s?\d{1,14}$/
        if (!phoneRegex.test(landlinePhone)) return { valid: 0, message: 'Your landlinePhone is not correcly formatted.' }
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return { valid: 0, message: 'Your email is not correcly formatted.' }

    return { valid: 1 }
}
