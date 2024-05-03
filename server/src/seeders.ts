import Persons from './models/person.model'
import Members from './models/member.model'
import Addresses from './models/address.model'
import Users from './models/user.model'
import bcrypt from 'bcrypt'
import Groups from './models/group.model'
import Belongers from './models/belonger.model'
import Tasks from './models/task.model'

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

    const memberBirthDate = new Date('2001-01-01T12:00:00').toISOString()
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
        username: person.firstname.toLowerCase() + '.' + person.lastname.toLowerCase(),
        password: hashedPassword,
        lastLogin: ct,
        mandateStart: ct,
        mandateEnd: ct,
        emailJE: person.email
    })

    console.log('User created', user)

    const groupBureau = await Groups.create({
        groupName: 'Bureau',
        createdAt: ct,
        updatedAt: ct
    })
    
    console.log('Group created', groupBureau)
    
    const belongerBureau = await Belongers.create({
        userId: user.userId,
        groupName: groupBureau.groupName
    })
    
    console.log('Belonger created', belongerBureau)
    
    const groupTrezo = await Groups.create({
        groupName: 'Trézo',
        createdAt: ct,
        updatedAt: ct
    })

    console.log('Group created', groupTrezo)

    const belongerTrezo = await Belongers.create({
        userId: user.userId,
        groupName: groupTrezo.groupName
    })

    console.log('Belonger created', belongerTrezo)


    const task1 = await Tasks.create({
        taskId: 1,
        userId: user.userId,
        dueDate: new Date('2023-07-26T12:00:00').toISOString(),
        description: 'Faire les courses',
        state: 'A faire',
        issuerId: user.userId
    })
    const task2 = await Tasks.create({
        taskId: 2,
        userId: user.userId,
        dueDate: new Date('2023-07-27T12:00:00').toISOString(),
        description: 'ReFaire les courses',
        state: 'A faire',
        issuerId: user.userId
    })
    console.log('Task created', task1, task2);
    
    const person2 = await Persons.create({
        firstname: 'Jane',
        lastname: 'Doe',
        gender : 'F',
        mobilePhone: '+33678657890',
        email: 'Jane@Doe.fr',
        landlinePhone: '+33687996621'
    })
    const address2 = await Addresses.create({
        address: 'Allée du Général pas de Gaulle',
        additionalAddress: '',
        city: 'Bordeaux',
        postCode: '33000',
        country: 'FRA'
    })
    const memberBirthDate2 = new Date('2002-02-02T12:00:00').toISOString()
    const ct2 = new Date().toISOString()
    const member2 = await Members.create({
        memberId: person2.personId,
        birthDate: memberBirthDate2,
        birthPlace: 'proche de Royan',
        nationality: 'FRA',
        promotion: '2024',
        contributionDate: ct2,
        paymentMethod: 'CB',
        department: 'Telecommunication',
        telegramId: '@pabechou',
        membershipNumber: '1235',
        addressId: address2.addressId
    })
    const hashedPassword2 = await bcrypt.hash('mdp2', 10)
    const user2 = await Users.create({
        userId: member2.memberId,
        username: person2.firstname.toLowerCase() + '.' + person2.lastname.toLowerCase(),
        password: hashedPassword2,
        lastLogin: ct2,
        mandateStart: ct2,
        mandateEnd: ct2,
        emailJE: person2.email
    })
    console.log('User created', user2)

    const person3 = await Persons.create({
        firstname: 'Tom',
        lastname: 'Doe',
        gender : 'M',
        mobilePhone: '+33678657890',
        email: 'tom@doe.fr',
        landlinePhone: '+33687996621'
    })
    const address3 = await Addresses.create({
        address: 'Allée du Général toujours pas de Gaulle',
        additionalAddress: '',
        city: 'Pessac',
        postCode: '33600',
        country: 'FRA'
    })
    const memberBirthDate3 = new Date('2003-03-03T12:00:00').toISOString()
    const ct3 = new Date().toISOString()
    const member3 = await Members.create({
        memberId: person3.personId,
        birthDate: memberBirthDate3,
        birthPlace: 'près de Royan',
        nationality: 'FRA',
        promotion: '2024',
        contributionDate: ct3,
        paymentMethod: 'CB',
        department: 'Matmeca',
        telegramId: '@pabechou',
        membershipNumber: '1236',
        addressId: address3.addressId
    })
    const hashedPassword3 = await bcrypt.hash('mdp3', 10)
    const user3 = await Users.create({
        userId: member3.memberId,
        username: person3.firstname.toLowerCase() + '.' + person3.lastname.toLowerCase(),
        password: hashedPassword3,
        lastLogin: ct3,
        mandateStart: ct3,
        mandateEnd: ct3,
        emailJE: person3.email
    })
    console.log('User created', user3)

    const task3 = await Tasks.create({
        taskId: 3,
        userId: user2.userId,
        dueDate: new Date('2023-07-26T12:00:00').toISOString(),
        description: 'Ne pas Faire les courses',
        state: 'A faire',
        issuerId: user.userId
    })
    const task4 = await Tasks.create({
        taskId: 4,
        userId: user2.userId,
        dueDate: new Date('2023-07-27T12:00:00').toISOString(),
        description: 'Ne pas ReFaire les courses',
        state: 'A faire',
        issuerId: user.userId
    })
    console.log('Task created', task3, task4);
    
    const task5 = await Tasks.create({
        taskId: 5,
        userId: user3.userId,
        dueDate: new Date('2023-07-26T12:00:00').toISOString(),
        description: 'Faire peut-etre les courses',
        state: 'A faire',
        issuerId: user.userId
    })
    const task6 = await Tasks.create({
        taskId: 6,
        userId: user3.userId,
        dueDate: new Date('2023-07-27T12:00:00').toISOString(),
        description: 'ReFaire peut-etre les courses',
        state: 'A faire',
        issuerId: user.userId
    })
    console.log('Task created', task5, task6);

    const groupperson = await Groups.create({
        groupName: person.firstname+' '+person.lastname,
        createdAt: ct,
        updatedAt: ct
    })
    const belongerperson = await Belongers.create({
        userId: user.userId,
        groupName: groupperson.groupName
    })
    const groupperson2 = await Groups.create({
        groupName: person2.firstname+' '+person2.lastname,
        createdAt: ct,
        updatedAt: ct
    })
    const belongerperson2 = await Belongers.create({
        userId: user2.userId,
        groupName: groupperson2.groupName
    })
    const groupperson3 = await Groups.create({
        groupName: person3.firstname+' '+person3.lastname,
        createdAt: ct,
        updatedAt: ct
    })
    const belongerperson3 = await Belongers.create({
        userId: user3.userId,
        groupName: groupperson3.groupName
    })

}

export default createFakeData
