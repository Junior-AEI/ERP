import Persons from './models/person.model'
import Members from './models/member.model'
import Addresses from './models/address.model'
import Users from './models/user.model'
import bcrypt from 'bcrypt'

const createFakeData = async () => {
    await createUser()
    console.log('--------------------FAKE DATA CREATED--------------------')
}

const createUser = async () => {
    const person = await Persons.create({
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        mobilePhone: '+33678657890',
        email: 'john@doe.fr',
        landlinePhone: '+33687996621'
    })

    const address = await Addresses.create({
        address: 'Allée du Général de Gaulle',
        additionalAddress: '',
        city: 'Talence',
        postCode: '33400',
        country: 'FRA'
    })

    const memberBirthDate = new Date('2002-07-26T12:00:00').toISOString()
    const ct = new Date().toISOString()

    const member = await Members.create({
        memberId: person.personId,
        birthDate: memberBirthDate,
        birthPlace: 'Royan',
        nationality: 'FRA',
        promotion: '2024',
        contributionDate: ct,
        paymentMethod: 'CB',
        department: 'Informatique',
        telegramId: '@pabechou',
        membershipNumber: '1234',
        addressId: address.addressId
    })

    const hashedPassword = await bcrypt.hash('mdp', 10)

    const user = await Users.create({
        userId: member.memberId,
        username: person.firstname + '.' + person.lastname,
        password: hashedPassword,
        lastLogin: ct,
        mandateStart: ct,
        mandateEnd: ct,
        emailJE: person.email
    })
}

export default createFakeData
