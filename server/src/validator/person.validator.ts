// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidPerson = (lastname: any, firstname: any, gender: any, mobilePhone: any, email: any, landlinePhone: any) => {
    if (!lastname || !firstname || !gender || !mobilePhone || !email) return { valid: 0, message: 'Veuillez remplir les champs obligatoires' }
    if (typeof lastname !== 'string') return { valid: 0, message: 'Your lastname is not correctly formatted.' }
    if (lastname.length < 1 || lastname.length >= 40) return { valid: 0, message: 'The size of your lastname is not valid' }
    if (typeof firstname !== 'string') return { valid: 0, message: 'Your firstname is not correctly formatted.' }
    if (firstname.length < 1 || firstname.length >= 40) return { valid: 0, message: 'The size of your firstname is not valid' }

    const phoneRegex: RegExp = /^\+\d{1,3}\s?\d{1,14}$/
    if (!phoneRegex.test(mobilePhone)) return { valid: 0, message: 'Les numéros de téléphone doivent commencer par l\'indicateur du pays +33 pour la France' }

    if (landlinePhone !== undefined && landlinePhone !== "") {
        const phoneRegex: RegExp = /^\+\d{1,3}\s?\d{1,14}$/
        if (!phoneRegex.test(landlinePhone)) return { valid: 0, message: 'Les numéros de téléphone doivent commencer par l\'indicateur du pays +33 pour la France' }
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return { valid: 0, message: 'Les emails doivent contenir un @ et un .' }

    return { valid: 1 }
}
