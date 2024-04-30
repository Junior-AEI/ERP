interface Person {
  personId: number;
  lastname: string;
  firstname: string;
  gender: string;
  mobilePhone: string;
  landlinePhone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Member {
  memberId: number;
  birthDate: Date;
  birthPlace: string;
  nationality: string;
  promotion: string;
  contributionDate: Date;
  paymentMethod: string;
  department: string;
  membershipNumber: number;
  addressId: number;
  createdAt: Date;
  updatedAt: Date;
}

type FullMember = Member & Person;

interface User {
  userId: number
  username: string
  mandateStart: Date;
  mandateEnd: Date;
  emailJE: string
}

interface Address {
  addressId: number
  address: string
  additionnalAddress: string
  city: string
  postCode: string
  country: string
  createdAt: Date
  updatedAt: Date
  member: Member[]
  company: Array<{}>
}

interface Event {
  eventId: string
  name: string
  startDate: string
  endDate: string
  location: string
  description: string
  eventTypeName: string
}

interface EventTypes {
  name: string
  fieldNumber: string
  fieldMeaning: string
}

interface itTicket {

  ticketId : number
  userId : number
  title : string
  description : string
  applicationConcerned : string
  state : string

}

type itTicketInfo = itTicket & User;



export type { Person, Member, FullMember, User, Event, Address, EventTypes, itTicket, itTicketInfo }
