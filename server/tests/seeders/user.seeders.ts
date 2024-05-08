import Persons from '../../src/models/person.model'
import Members from '../../src/models/member.model'
import Addresses from '../../src/models/address.model'
import Users from '../../src/models/user.model'
import bcrypt from 'bcrypt'
import { characters } from './data/characters.data'

export const createUser = async (username: string) => {
    const person = await Persons.create(characters[username].person)

    const address = await Addresses.create(characters[username].address)

    const memberBirthDate = new Date(characters[username].memberBirthDate).toISOString()
    const ct = new Date().toISOString()

    const member = await Members.create({
        memberId: person.personId,
        birthDate: memberBirthDate,
        contributionDate: ct,
        addressId: address.addressId,
        membershipNumber: 10,
        ...characters[username].member
    })

    const hashedPassword = await bcrypt.hash(characters[username].password, 10)

    const user = await Users.create({
        userId: member.memberId,
        username: person.firstname.toLocaleLowerCase() + '.' + person.lastname.toLocaleLowerCase(),
        password: hashedPassword,
        lastLogin: ct,
        mandateStart: ct,
        mandateEnd: ct,
        emailJE: person.email
    })

    return user.userId
}
