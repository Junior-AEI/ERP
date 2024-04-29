import Addresses from '../../src/models/address.model'
import Companies from '../../src/models/company.model'
import { companies } from './data/companies.data'

export const createCompany = async (name: string) => {
    const address = await Addresses.create(companies[name].address)

    const company = await Companies.create({
        name: name,
        legalEntity: companies[name].legalEntity,
        addressId: address.addressId,
    })

    return company.companyId
}

export const createAddress = async (name: string) => {
    const address = await Addresses.create(companies[name].address)

    return address.addressId
}
