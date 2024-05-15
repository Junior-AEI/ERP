import Persons from './models/person.model'
import Members from './models/member.model'
import Addresses from './models/address.model'
import Users from './models/user.model'
import bcrypt from 'bcrypt'
import Groups from './models/group.model'
import Belongers from './models/belonger.model'
import Tasks from './models/task.model'
import Events from './models/event.model'
import DocumentTypes from './models/documentType.model'
import Projects from './models/project.model'
import Clients from './models/client.model'
import Companies from './models/company.model'
import ProjectNotes from './models/projectNote.model'
import Contributors from './models/contributor.model'
import ProjectManagers from './models/projectManager.model'
import ItTickets from './models/ItTicket.model'

import expenseAccounts from './models/expenseAccount.model'
import Documents from './models/document.model'



const createFakeData = async () => {
    await createUsers()
    await createMembers()
    await createClients()
    await createDocType()
    await createEvents()
    await createTasks()
    await createGroup()
    await createProjects()
    await createExpenseAccount()
    await createItTickets()
    await createDocuments()
    console.log('--------------------FAKE DATA CREATED--------------------')
}

const createUsers = async () => {
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
    const mandateStart = new Date('2024-04-01T12:00:00').toISOString()
    const mandateEnd = new Date('2024-03-01T12:00:00').toISOString()

    const ct = new Date().toISOString()

    const member = await Members.create({
        memberId: person.personId,
        birthDate: memberBirthDate,
        birthPlace: 'Royan',
        nationality: 'FRA',
        promotion: '2024',
        contributionDate: ct,
        paymentMethod: 'HelloAsso',
        department: 'Informatique',
        telegramId: '@pabechou',
        membershipNumber: '1234',
        addressId: address.addressId
    })

    const hashedPassword = await bcrypt.hash('password', 10)

    const user = await Users.create({
        userId: member.memberId,
        username: person.firstname.toLowerCase() + '.' + person.lastname.toLowerCase(),
        password: hashedPassword,
        lastLogin: ct,
        mandateStart: mandateStart,
        mandateEnd: mandateEnd,
        emailJE: person.email
    })
    const groupperson = await Groups.create({
        groupName: person.firstname + ' ' + person.lastname,
        createdAt: ct,
        updatedAt: ct
    })
    const belongerperson = await Belongers.create({
        userId: user.userId,
        groupId: groupperson.groupId
    })
    console.log('User 1 created', user)

    const person2 = await Persons.create({
        firstname: 'Jane',
        lastname: 'Doe',
        gender: 'F',
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
        paymentMethod: 'HelloAsso',
        department: 'Telecommunication',
        telegramId: '@pabechou',
        membershipNumber: '1235',
        addressId: address2.addressId
    })
    const hashedPassword2 = await bcrypt.hash('password2', 10)
    const user2 = await Users.create({
        userId: member2.memberId,
        username: person2.firstname.toLowerCase() + '.' + person2.lastname.toLowerCase(),
        password: hashedPassword2,
        lastLogin: ct2,
        mandateStart: ct2,
        mandateEnd: ct2,
        emailJE: person2.email
    })
    const groupperson2 = await Groups.create({
        groupName: person2.firstname + ' ' + person2.lastname,
        createdAt: ct,
        updatedAt: ct
    })
    const belongerperson2 = await Belongers.create({
        userId: user2.userId,
        groupId: groupperson2.groupId
    })
    console.log('User created', user2)


    const person3 = await Persons.create({
        firstname: 'Tom',
        lastname: 'Doe',
        gender: 'M',
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
        paymentMethod: 'HelloAsso',
        department: 'Matmeca',
        telegramId: '@pabechou',
        membershipNumber: '1236',
        addressId: address3.addressId
    })
    const hashedPassword3 = await bcrypt.hash('password3', 10)
    const user3 = await Users.create({
        userId: member3.memberId,
        username: person3.firstname.toLowerCase() + '.' + person3.lastname.toLowerCase(),
        password: hashedPassword3,
        lastLogin: ct3,
        mandateStart: ct3,
        mandateEnd: ct3,
        emailJE: person3.email
    })
    const groupperson3 = await Groups.create({
        groupName: person3.firstname + ' ' + person3.lastname,
        createdAt: ct,
        updatedAt: ct
    })
    const belongerperson3 = await Belongers.create({
        userId: user3.userId,
        groupId: groupperson3.groupId
    })
    console.log('User created', user3)

}



const createMembers = async () => {
    const person4 = await Persons.create({
        firstname: 'Emily',
        lastname: 'Brown',
        gender: 'F',
        mobilePhone: '+33678657890',
        email: 'emilybrown@example.com',
        landlinePhone: '+33687996621'
    })
    const memberBirthDate = new Date('2003-03-03T12:00:00').toISOString()
    const ct = new Date().toISOString()
    const member4 = await Members.create({
        memberId: person4.personId,
        birthDate: memberBirthDate,
        birthPlace: 'London',
        nationality: 'GBR',
        promotion: '2019',
        contributionDate: ct,
        paymentMethod: 'HelloAsso',
        department: 'Informatique',
        telegramId: '@emilybrown',
        membershipNumber: '987654',
        addressId: 1
    })



    const person5 = await Persons.create({
        firstname: 'Carlos',
        lastname: 'Garcia',
        gender: 'M',
        mobilePhone: '+33678657890',
        email: 'mathieu.chaillon@gmail.com',
        landlinePhone: '+33687996621'
    })
    const member5 = await Members.create({
        memberId: person5.personId,
        birthDate: memberBirthDate,
        birthPlace: 'Madrid',
        nationality: 'ESP',
        promotion: '2017',
        contributionDate: ct,
        paymentMethod: 'HelloAsso',
        department: 'Informatique',
        telegramId: '@emilybrown',
        membershipNumber: '987654',
        addressId: 1
    })
    const person6 = await Persons.create({
        firstname: 'Lee',
        lastname: 'Soo',
        gender: 'F',
        mobilePhone: '+33678657890',
        email: 'mathieu.chaillon@gmail.com',
        landlinePhone: '+33687996621'
    })
    const member6 = await Members.create({
        memberId: person6.personId,
        birthDate: memberBirthDate,
        birthPlace: 'Seoul',
        nationality: 'KOR',
        promotion: '2016',
        contributionDate: ct,
        paymentMethod: 'HelloAsso',
        department: 'R&I',
        telegramId: '@soominlee',
        membershipNumber: '987654',
        addressId: 1
    })
}

const createClients = async () => {
    const personClient1 = await Persons.create({
        firstname: 'Jacques',
        lastname: 'Dupont',
        gender: 'M',
        mobilePhone: '+33678657890',
        email: 'jacques@client.fr',
        landlinePhone: '+33687996621'
    })

    const addressCompany1 = await Addresses.create({
        address: 'Allée de la Company1',
        additionalAddress: '',
        city: 'ClientVille',
        postCode: '99999',
        country: 'FRA'
    })

    const company1 = await Companies.create({
        name: 'MI6',
        legalEntity: 'Non connu',
        addressId: addressCompany1.addressId,
        companyType: 'PME',
        activityField: 'Informatique',
    })

    const client1 = await Clients.create({
        clientId: personClient1.personId,
        function: 'PDG',
        companyId: company1.companyId,
        firstContact: 'Soirée partenaire'

    })

    const personClient2 = await Persons.create({
        firstname: 'James',
        lastname: 'Bond',
        gender: 'M',
        mobilePhone: '+33678657890',
        email: 'jacques2@client.fr',
        landlinePhone: '+33687996621'
    })

    const client2 = await Clients.create({
        clientId: personClient2.personId,
        function: 'Agent',
        companyId: company1.companyId,
        firstContact: 'Site AEI',
    })

    const company2 = await Companies.create({
        name: 'Airbus',
        legalEntity: 'Non connu',
        addressId: addressCompany1.addressId,
        companyType: 'Grand Groupe',
        activityField: 'Informatique',
    })

    const personClient3 = await Persons.create({
        firstname: 'John',
        lastname: 'Trek',
        gender: 'M',
        mobilePhone: '+33678657890',
        email: 'johntrek@client.fr',
        landlinePhone: '+33687996621'
    })

    const client3 = await Clients.create({
        clientId: personClient3.personId,
        function: 'Directeur',
        companyId: company2.companyId,
        firstContact: 'Soirée partenaire',
        createdAt: new Date('2024-03-26T12:00:00')
    })

}


const createGroup = async () => {


    const groupBureau = await Groups.create({
        groupName: 'Bureau',
    })

    console.log('Group created', groupBureau)

    const belongerBureau = await Belongers.create({
        userId: 1,
        groupId: groupBureau.groupId
    })
    const belongerBureau2 = await Belongers.create({
        userId: 2,
        groupId: groupBureau.groupId
    })

    console.log('Belonger created', belongerBureau)

    const groupTrezo = await Groups.create({
        groupName: 'Trézo',

    })

    console.log('Group created', groupTrezo)

    const belongerTrezo = await Belongers.create({
        userId: 1,
        groupId: groupTrezo.groupId
    })

    console.log('Belonger created', belongerTrezo)

}

const createTasks = async () => {


    const task1 = await Tasks.create({
        userId: 1,
        dueDate: new Date('2023-07-26T12:00:00').toISOString(),
        description: 'Faire les courses',
        state: 'A faire',
        issuerId: 1
    })
    const task2 = await Tasks.create({

        userId: 1,
        dueDate: new Date('2023-07-27T12:00:00').toISOString(),
        description: 'Faire l\'ERP',
        state: 'En cours',
        issuerId: 2
    })
    const task3 = await Tasks.create({

        userId: 1,
        dueDate: new Date('2023-06-20T12:00:00').toISOString(),
        description: 'Tache3',
        state: 'Terminée',
        issuerId: 2
    })
    const task4 = await Tasks.create({

        userId: 1,
        dueDate: new Date('2023-05-07T12:00:00').toISOString(),
        description: 'Tache4',
        state: 'Terminée',
        issuerId: 2
    })
    const task5 = await Tasks.create({
        userId: 1,
        dueDate: new Date('2023-07-30T12:00:00').toISOString(),
        description: 'Tache5',
        state: 'A faire',
        issuerId: 2
    })
    console.log('Task created', task1, task2)

    const task6 = await Tasks.create({
        userId: 2,
        dueDate: new Date('2023-05-07T12:00:00').toISOString(),
        description: 'Faire démo de Jane',
        state: 'Terminée',
        issuerId: 2
    })
}


const createEvents = async () => {

    const event1 = await Events.create({
        name: 'Formation : Apprendre à utiliser le nouvel ERP',
        startDate: new Date('2024-05-16T10:40:00').toISOString(),
        endDate: new Date('2024-05-16T11:20:00').toISOString(),
        location: 'Local AEI',
        description: 'Toute ressemblance avec un certain événement réel est absolument fortuite.',
        eventTypeName: 'Formation'
    })

    const event2 = await Events.create({
        name: 'Réunion : préparer la prochaine réunion',
        startDate: new Date('2024-05-01T10:00:00').toISOString(),
        endDate: new Date('2024-05-01T11:00:00').toISOString(),
        location: 'Local AEI',
        description: 'Ceci est une description',
        eventTypeName: 'Réunion'
    })

    const event3 = await Events.create({
        name: 'Un événement très lointain',
        startDate: new Date('2024-07-01T14:00:00').toISOString(),
        endDate: new Date('2024-07-02T15:00:00').toISOString(),
        location: 'Local AEI',
        description: 'Ceci est toujours une description',
        eventTypeName: 'Autre'
    })
    const event4 = await Events.create({
        name: 'Un événement très long',
        startDate: new Date('2024-06-01T14:00:00').toISOString(),
        endDate: new Date('2024-07-02T15:00:00').toISOString(),
        location: 'Local AEI',
        description: 'Ceci est toujours une description',
        eventTypeName: 'Autre'
    })

    console.log('Event created', event1, event2, event3)
}
const createDocType = async () => {

    const documentType1 = await DocumentTypes.create({
        documentTypeId: 1,
        type: "Convention d'Étude",
        fieldNumber: 4,
        fieldMeaning: 'Étude (Acronyme)|Frais de commande (HT)|Frais de Structure (HT)|JEH (HT)|Date de fin de validité'
    })

    const documentType2 = await DocumentTypes.create({
        documentTypeId: 2,
        type: "Avenant à la convention d'Étude",
        fieldNumber: 2,
        fieldMeaning: "Étude (Acronyme)|Type d'Avenant|Date de fin de validité"
    })

    const documentType3 = await DocumentTypes.create({
        documentTypeId: 3,
        type: 'Récapitulatif de mission',
        fieldNumber: 3,
        fieldMeaning: 'Étude (Acronyme)|Intervenant concerné|Rétribution brute|Date de fin de validité'
    })

    const documentType4 = await DocumentTypes.create({
        documentTypeId: 4,
        type: 'Facture de Solde',
        fieldNumber: 5,
        fieldMeaning: 'Numéro de facture|Frais de commande (HT)|Frais de structure (HT)|JEH (HT)|Date de fin de validité'
    })
    const documentType5 = await DocumentTypes.create({
        documentTypeId: 5,
        type: "Doc lié à un événement",
        fieldNumber: 1,
        fieldMeaning: 'EventId'
    })
    const documentType6 = await DocumentTypes.create({
        documentTypeId: 6,
        type: "Doc lié à un ticket DSI",
        fieldNumber: 1,
        fieldMeaning: 'TicketId'
    })

    const documentType7 = await DocumentTypes.create({
        documentTypeId: 7,
        type: "Doc lié à une Demande de Note de Frais",
        fieldNumber: 1,
        fieldMeaning: 'expenseAccountId'
    })
    console.log('DocumentType created', documentType1, documentType2, documentType3, documentType4, documentType5, documentType6)

}

const createProjects = async () => {


    const project1 = await Projects.create({
        name: 'Création d\'un ERP',
        acronym: 'ERP',
        clientId: 7,
        startDate: new Date('2023-07-26T12:00:00'),
        endDate: new Date('2024-07-27T12:00:00')
    })

    const contributor1 = await Contributors.create({
        projectId: 1,
        memberId: 4
    })
    const projectManager = await ProjectManagers.create({
        projectId: 1,
        userId: 3
    })

    const note1Project1 = await ProjectNotes.create({
        noteId: 1,
        writerId: 2,
        projectId: 1,
        comment: 'Ca avance bien',
        advancement: 'CE signé'
    })

    const note2Project1 = await ProjectNotes.create({
        noteId: 2,
        writerId: 2,
        projectId: 1,
        comment: 'Ca avance toujours bien',
        advancement: 'FA émise'
    })

    const project2 = await Projects.create({
        name: 'Carte electronique',
        acronym: 'CEL',
        clientId: 8,
        startDate: new Date('2022-07-26T12:00:00'),
        endDate: new Date('2023-07-27T12:00:00')
    })


    const note1Project2 = await ProjectNotes.create({
        noteId: 3,
        writerId: 2,
        projectId: 2,
        comment: 'Ca avance plutot bien',
        advancement: 'Prospection'
    })
    const note2Project2 = await ProjectNotes.create({
        noteId: 4,
        writerId: 2,
        projectId: 2,
        comment: 'Ca avance plutot bien',
        advancement: 'CE signé'
    })
    console.log('Project created', project1, project2, note1Project1, note2Project1, note1Project2, note2Project2)



    const contributor2 = await Contributors.create({
        projectId: 2,
        memberId: 6
    })



    const projectManager2 = await ProjectManagers.create({
        projectId: 2,
        userId: 1
    })

    const projectManager3 = await ProjectManagers.create({
        projectId: 1,
        userId: 2
    })

    const project3 = await Projects.create({
        name: 'Carte electronique 2',
        acronym: 'CEL2',
        clientId: 8,
        startDate: new Date('2023-07-26T12:00:00'),
        endDate: new Date('2024-05-17T12:00:00')
    })

}



const createExpenseAccount = async () => {
    const expenseAccount1 = await expenseAccounts.create({
        userId: 2,
        approbatorId: 1,
        expenseId: NaN,
        reason: 'CNE',
        expenseDate: new Date('2023-07-27T12:00:00'),
        description: 'Demande de remboursement pour le Congrès d\'été',
        state: 'A Traiter',

    })

    const expenseAccount2 = await expenseAccounts.create({
        userId: 2,
        approbatorId: 1,
        expenseId: NaN,
        reason: 'CNH',
        expenseDate: new Date('2024-04-27T12:00:00'),
        description: 'Demande de remboursement pour l\'essence du Congrès d\'hiver',
        state: 'Traitée',

    })
    const expenseAccount3 = await expenseAccounts.create({
        userId: 3,
        approbatorId: 1,
        expenseId: NaN,
        reason: 'CNE',
        expenseDate: new Date('2023-07-27T12:00:00'),
        description: 'Demande de remboursement pour le Congrès d\'été',
        state: 'Traitée',

    })
    const expenseAccount4 = await expenseAccounts.create({
        userId: 1,
        approbatorId: 2,
        expenseId: NaN,
        reason: 'Imprimante',
        expenseDate: new Date('2024-07-27T12:00:00'),
        description: 'Demande de remboursement pour l\'encre',
        state: 'En cours',

    })
    const expenseAccount5 = await expenseAccounts.create({
        userId: 3,
        approbatorId: 1,
        expenseId: NaN,
        reason: 'Poste',
        expenseDate: new Date('2023-07-22T12:00:00'),
        description: 'Demande de remboursement de frais postaux',
        state: 'A Traiter',

    })


}

const createItTickets = async () => {
    const ItTicket1 = await ItTickets.create({
        userId: 1,
        title: 'Problème avec mon mail',
        applicationConcerned: 'Mail', 
        description: 'J\'arrive pas à me connecter à mon mail',
        state: 'A faire',

    })
    const ItTicket2 = await ItTickets.create({
        userId: 3,
        title: 'Y a plus d\'ERP',
        applicationConcerned: 'ERP', 
        description: 'J\'arrive pas à aller sur l\'ERP',
        state: 'En cours',

    })
    const ItTicket3 = await ItTickets.create({
        userId: 2,
        title: 'Processus à modifier',
        applicationConcerned: 'Processus', 
        description: 'Je veux modif le processus de Note de Frais',
        state: 'A faire',

    })
    const ItTicket4 = await ItTickets.create({
        userId: 3,
        title: 'Bug Passbolt',
        applicationConcerned: 'Passbolt', 
        description: 'Passbolt fonctionne plus',
        state: 'Clos',

    })

}


const createDocuments = async () => {
    const Document1 = await Documents.create({
        name: "ACE_CEL",
        path: 'documentUploads/4b08ca99df8b69ae2826fe37e5618e17966799a3c453d1914d264f7ccc4bd942.pdf',
        version: 2, 
        typeId : 2,
        information : "CEL|Budget|2024-05-31",
        status: 'Relu',
        authorId: 1

    })
    
    const Document2 = await Documents.create({
        name: "ACE_ERP",
        path: 'documentUploads/24a6284c6692dceb3a4b2b2e1b33cc4aba59fad4171d93a2e465a12b99dc1ba2.pdf',
        version: 1, 
        typeId : 1,
        information : "ERP|Budget|2024-05-31",
        status: 'A relire',
        authorId: 1

    })
    const Document3 = await Documents.create({
        name: "Logo_Pour_Affiche",
        path: 'documentUploads/5a1af567344bbf4255819106eb3c60bc37ad29ec05fef826ea15280f91249455.png',
        version: 1, 
        typeId : 5,
        information : "3",
        status: 'Sans Relecture',
        authorId: 2

    })
    const Document4 = await Documents.create({
        name: "Ancienne Plaquette",
        path: 'documentUploads/27b6d7b9790e34fc59335bf7c3be2fc54c01e56bd27e2f0a93b2f0d8b76ecef4.pdf',
        version: 1, 
        typeId : 5,
        information : "3",
        status: 'Sans Relecture',
        authorId: 2

    })
    const Document5 = await Documents.create({
        name: "Screen Bug Ancien ERP",
        path: 'documentUploads/437a5bf11200a3c3c707e1b59779d130c8be922518c3a7d56a078e1d89a7cfa3.png',
        version: 1, 
        typeId : 6,
        information : "2",
        status: 'Sans Relecture',
        authorId: 3

    })
    const Document6 = await Documents.create({
        name: "Processus à changer",
        path: 'documentUploads/465274830bdb3e4b9b0c8dc354a2c8a49579f715251be482bda0a858acb311b1.png',
        version: 1, 
        typeId : 6,
        information : "3",
        status: 'Sans Relecture',
        authorId: 1

    })
    const Document7 = await Documents.create({
        name: "Ticket de caisse",
        path: 'documentUploads/af7a3ac087e93314bb89d60149be069397d8bc62fceace1920cfb947d3dc569e.jpeg',
        version: 1, 
        typeId : 7,
        information : "3",
        status: 'Sans Relecture',
        authorId: 1

    })
    const Document8 = await Documents.create({
        name: "CE_CEL",
        path: 'documentUploads/5febbe974471486d1a2a5e7dbc85db11e5815450b5dd9d2fcf7ae7d9f590f6a6.pdf',
        version: 1, 
        typeId : 1,
        information : "CEL|2500|50|5000|2024-06-29",
        status: 'A relire',
        authorId: 2

    })

}
export default createFakeData
