import Persons from '../../src/models/person.model'
import Members from '../../src/models/member.model'
import Addresses from '../../src/models/address.model'
import { characters } from './data/characters.data'

export const createMember = async (username: string) => {
    const person = await Persons.create(characters[username].person)

    const address = await Addresses.create(characters[username].address)

    const memberBirthDate = new Date(characters[username].memberBirthDate).toISOString()
    const ct = new Date().toISOString()

    const member = await Members.create({
        memberId: person.personId,
        birthDate: memberBirthDate,
        contributionDate: ct,
        addressId: address.addressId,
        ...characters[username].member
    })

    return member.memberId
}
