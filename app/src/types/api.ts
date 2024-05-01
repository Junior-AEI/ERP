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
  startDate: DateString | null
  endDate: DateString | null
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
}

type itTicketInfo = itTicket & User

export type { Person, Member, FullMember, User, Event, Address, itTicket, itTicketInfo }
