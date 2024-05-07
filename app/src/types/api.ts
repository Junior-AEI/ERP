type DateString = string

interface Person {
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

interface Member {
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
}

type FullMember = Member & Person

interface User {
  userId: number
  username: string
  mandateStart: DateString
  mandateEnd: DateString
  emailJE: string
}

interface Address {
  addressId: number
  address: string
  additionnalAddress: string
  city: string
  postCode: string
  country: string
  createdAt: DateString
  updatedAt: DateString
  member: Member[]
  company: Array<{}>
}

interface Event {
  eventId: number
  name: string
  startDate: DateString
  endDate: DateString
  location: string
  description: string
  eventTypeName: string
}

interface itTicket {
  ticketId: number
  userId: number
  title: string
  description: string
  applicationConcerned: string
  state: string
  createdAt: DateString

}

type itTicketInfo = itTicket & User;

interface Group {
  groupName: string
  createdAt: DateString
  updatedAt: DateString
}


interface Belonger {
  userId: number
  groupName: string
}

type UserInGroup = Group & Belonger

interface Task {
  taskId: number
  userId: number
  dueDate: string
  description: string
  state: string
  issuerId: number
}

interface ExpenseAccount {
  expenseId: number
  userId: number
  approbatorId: number
  reason: string
  expenseDate: DateString
  description: string
  state: string
}

interface InfoExpense {
  usernameUser : string
  usernameApprobator : string
}

type ExpenseAccountInfo = ExpenseAccount & InfoExpense;

interface Company {
  name :string
  legalEntity: string
  addressId : number
}

interface Client {
  function : string
}

type ClientInfo = Client & Company & Person
export type { ClientInfo, ExpenseAccount, ExpenseAccountInfo, Person, Member, FullMember, User, Event, Address, itTicket, itTicketInfo, Group, Task, UserInGroup }
