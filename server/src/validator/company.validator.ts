import { COMPANYTYPES } from "../models/company.model"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isValidCompany = (name: any, legalEntity: any, companyType: any, activityField: any) => {
    if (name === undefined || legalEntity === undefined) return { valid: 0, message: 'Please fill all the fields.' }

    if (typeof name !== 'string') return { valid: 0, message: 'Your name is not correctly formatted.' }
    if (name.length < 1 || name.length >= 60) return { valid: 0, message: 'Your name size has to be smaller than 60' }
    if (typeof legalEntity !== 'string') return { valid: 0, message: 'Your legal entity is not correctly formatted.' }
    if (legalEntity.length < 3 || legalEntity.length >= 40)
        return {
            valid: 0,
            message: 'Your legal entity size has to be bigger than 3 and smaller than 40'
        }
    if (typeof companyType !== 'string') return {valid: 0, message: 'Your companyType is not correctly formatted.'}
    if (companyType.length < 3 ||companyType.length >= 13) return {valid: 0, message: 'Your companyType size is not valid.'}
    if (!COMPANYTYPES.includes(companyType)) return { valid: 0, message: 'Your company type is not in COMPANYTYPES.' }
    if (typeof activityField !== 'string') return {valid: 0, message: 'Your activityField is not correctly formatted.'}
    if (activityField.length < 1 || activityField.length >= 50) return {valid: 0, message: 'Your activityField size is not valid.'}
    
    return { valid: 1 }
}
