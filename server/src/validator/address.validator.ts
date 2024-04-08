/* eslint-disable @typescript-eslint/no-explicit-any */
export const isValidAddress = (address: any, additionnalAddress: any, city: any, postCode: any, country: any) => {
    if (typeof address != 'string') return { valid: 0, message: 'Your adress is not correctly formatted.' }
    if (address.length === 0 || address.length > 50) return { valid: 0, message: 'Your adress is too long.' }
    if (typeof additionnalAddress != 'string') return { valid: 0, message: 'Your additionnal adress is not correctly formatted.' }
    if (additionnalAddress.length === 0 || additionnalAddress.length > 50) return { valid: 0, message: 'Your additionnal address is too long.' }
    if (typeof city != 'string') return { valid: 0, message: 'Your city is not correctly formatted.' }
    if (city.length === 0 || city.length > 50) return { valid: 0, message: 'Your city is too long.' }
    if (typeof postCode != 'string') return { valid: 0, message: 'Your postal code is not correctly formatted.' }
    if (postCode.length === 0 || postCode.length > 10) return { valid: 0, message: 'Your postal code is too long.' }
    if (typeof country != 'string') return { valid: 0, message: 'Your country code is not correctly formatted.' }
    if (country.length !== 3) return { valid: 0, message: 'Your country code is too long.' }

    return { valid: 1 }
}
