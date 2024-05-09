import Persons from '../../src/models/person.model'
import Clients from '../../src/models/client.model'
import Companies from '../../src/models/company.model'
import Addresses from '../../src/models/address.model'
import { clients } from './data/clients.data'

export const createClient = async (username: string) => {
    const person = await Persons.create(clients[username].person)

    const address = await Addresses.create(clients[username].address)

    const company = await Companies.create({
        addressId: address.addressId,
        ...clients[username].company
    })

    const client = await Clients.create({
        clientId: person.personId,
        addressId: address.addressId,
        companyId: company.companyId,
        function: clients[username].function,
        firstContact: clients[username].firstContact,
    })

    return client.clientId
}

export const createPerson = async (username: string) => {
    const person = await Persons.create(clients[username].person)

    return person.personId
}
