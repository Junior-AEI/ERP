// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidUser = (username: any, password: any, mandateStart: any, emailJE: any) => {

    if(username === undefined || password === undefined || mandateStart == undefined || emailJE == undefined) return {valid:0, message:"Please fill all the fields."}

    if (typeof username !== 'string') return { valid: 0, message: 'Your username is not correctly formatted.' }
    if (username.length < 1 || username.length >= 20) return { valid: 0, message: 'The size of your username is not valid' }
    if (typeof password !== 'string') return { valid: 0, message: 'Your password is not correctly formatted.' }
    if (password.length < 8 || password.length >= 20) return { valid: 0, message: 'Your password size has to be bigger than 8.' }
    if (!(mandateStart instanceof Date)) return { valid: 0, message: 'Your mandate start is not correctly formatted.' }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailJE)) return { valid: 0, message: 'Your email is not correcly formatted.' }

    return { valid: 1 }
}
