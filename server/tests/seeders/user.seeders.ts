import Persons from '../../src/models/person.model'
import Members from '../../src/models/member.model'
import Addresses from '../../src/models/address.model'
import Users from '../../src/models/user.model'
import bcrypt from 'bcrypt'

const users: any = {

    // John Doe user
    johnDoe: {
        person: {
            firstname: 'John',
            lastname: 'Doe',
            gender: 'M',
            mobilePhone: '+33678657890',
            email: 'john@doe.fr',
            landlinePhone: '+33687996621'
        },
        address: {
            address: 'Allée du Général de Gaulle',
            additionalAddress: '',
            city: 'Talence',
            postCode: '33400',
            country: 'FRA'
        },
        memberBirthDate: '2002-07-26T12:00:00',
        member: {
            birthPlace: 'Royan',
            nationality: 'FRA',
            promotion: '2024',
            paymentMethod: 'CB',
            department: 'Informatique',
            telegramId: '@pabechou',
        },
        password: 'mdp'
    },

    // Jane Doe user
    janeDoe: {
        person: {
            firstname: 'Jane',
            lastname: 'Doe',
            gender: 'F',
            mobilePhone: '+33646386357',
            email: 'jane@doe.fr',
            landlinePhone: '+33674589563'
        },
        address: {
            address: 'Rue de la Victoire',
            additionalAddress: '',
            city: 'Bordeaux',
            postCode: '33800',
            country: 'FRA'
        },
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

