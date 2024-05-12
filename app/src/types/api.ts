export type DateString = string

export type TimeValue = {
  hour: string
  minute: string
  second: string
}

export interface Person {
  personId: number
  lastname: string
  firstname: string
  gender: string
  mobilePhone: string
  landlinePhone: string
  email: string
  createdAt: DateString
  updatedAt: DateString
}

export interface Member {
  memberId: number
  birthDate: DateString
  birthPlace: string
  nationality: string
  promotion: string
  contributionDate: DateString
  paymentMethod: string
  department: string
  membershipNumber: number
  addressId: number
  createdAt: DateString
  updatedAt: DateString
  telegramId: string
  chatBotId: string
}

export type FullMember = Member & Person

export interface User {
  userId: number
  username: string
  mandateStart: DateString
  mandateEnd: DateString
  emailJE: string
}

export interface Address {
  addressId: number
  address: string
  additionnalAddress: string
  city: string
  postCode: string
  country: string
}

export type FullMemberWithAdress = Member & Person & Address
export type FullUserWithAdress = Member & Person & Address & User
export interface Event {
  eventId: number
  name: string
  startDate: DateString
  endDate: DateString
  location: string
  description: string
  eventTypeName: string
}

export interface itTicket {
  ticketId: number
  userId: number
  title: string
  description: string
  applicationConcerned: string
  state: string
  createdAt: DateString
}

export type itTicketInfo = itTicket & User

export interface Group {
  groupName: string
  createdAt: DateString
  updatedAt: DateString
}

export interface Belonger {
  userId: number
  groupName: string
}

export type UserInGroup = Group & Belonger

export interface Task {
  taskId: number
  userId: number
  dueDate: string
  description: string
  state: string
  issuerId: number
}

export interface ExpenseAccount {
  expenseId: number
  userId: number
  approbatorId: number
  reason: string
  expenseDate: DateString
  description: string
  state: string
}

export interface InfoExpense {
  usernameUser: string
  usernameApprobator: string
}

export type ExpenseAccountInfo = ExpenseAccount & InfoExpense

export interface Company {
  name: string
  legalEntity: string
  addressId: number
  companyId: number
  companyType: string
}

export interface Client {
  function: string
  firstContact: string
}

export type ClientInfo = Client & Company & Person & Address

export interface Document {
  documentId: number
  name: string
  path: string
  version: number
  typeId: number
  information: string
  status: string
  authorId: number
  createdAt: DateString
}

export interface DocumentType {
  typeId: number
  type: string
  fieldNumber: number
  fieldMeaning: string
}

export type DocumentFull = Document & DocumentType // combine Document and DocumentType


export type ProjectInfo = Project & ClientInfo

export interface Project {
  projectId: number
  acronym: string
  nameProject: string
  startDate: DateString
  endDate: DateString
  clientId: number

}

export interface ProjectNotes {
  noteId: number
  projectId: number
  writerId: number
  comment: string
  advancement: string
  createdAt: DateString
}

export type ExtendedProject = ProjectInfo & { delta: string } & { contributors: Person[], projectManagers: Person[] }

export interface Contributor {
  contributorId: number
  projectId: number
  personId: number
}

export interface ProjectManager {
  projectManagerId: number
  projectId: number
  personId: number
}

