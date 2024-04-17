import Persons from '../../src/models/person.model'
import Members from '../../src/models/member.model'
import Addresses from '../../src/models/address.model'
import Users from '../../src/models/user.model'
import bcrypt from 'bcrypt'

const users: any = {

    // John Doe member
    'john.doe': {
        birthPlace: 'Royan',
        nationality: 'FRA',
        promotion: '2024',
        paymentMethod: 'CB',
        department: 'Informatique',
        telegramId: '@pabechou',
    },

    // Jane Doe member
    "jane.doe": {
        memberBirthDate: '2002-02-12T16:00:00',
        member: {
            birthPlace: 'Paris',
            nationality: 'FRA',
            promotion: '2024',
            paymentMethod: 'CB',
            department: 'Informatique',
            telegramId: '',
        },
        password: 'mdp'
    },

}

export const createUser = async (username: string) => {
    const person = await Persons.create(users[username].person)

    const address = await Addresses.create(users[username].address)

    const memberBirthDate = new Date(users[username].memberBirthDate).toISOString()
    const ct = new Date().toISOString()

    const member = await Members.create({
        memberId: person.personId,
        birthDate: memberBirthDate,
        contributionDate: ct,
        addressId: address.addressId,
        ...users[username].member
    })

    const hashedPassword = await bcrypt.hash(users[username].password, 10)

    const user = await Users.create({
        userId: member.memberId,
        username: person.firstname.toLocaleLowerCase() + '.' + person.lastname.toLocaleLowerCase(),
        password: hashedPassword,
        lastLogin: ct,
        mandateStart: ct,
        mandateEnd: ct,
        emailJE: person.email
    })
}
