import { type DateValue } from '@internationalized/date';

interface Person {
  personId: number;
  lastname: string;
  firstname: string;
  gender: string;
  mobilePhone: string;
  landlinePhone: string;
  email: string;
  createdAt: DateValue;
  updatedAt: DateValue;
}

interface Member {
  memberId: number;
  birthDate: DateValue;
  birthPlace: string;
  nationality: string;
  promotion: string;
  contributionDate: DateValue;
  paymentMethod: string;
  department: string;
  membershipNumber: number;
  addressId: number;
  createdAt: DateValue;
  updatedAt: DateValue;
}

type FullMember = Member & Person;

interface User {
  userId: number
  username: string
  mandateStart: DateValue;
  mandateEnd: DateValue;
  emailJE: string
}

interface Address {
  addressId: number
  address: string
  additionnalAddress: string
  city: string
  postCode: string
  country: string
  createdAt: DateValue
  updatedAt: DateValue
  member: Member[]
  company: Array<{}>
}

interface Event {
  eventId: number
  name: string
  startDate: DateValue
  endDate: DateValue
  location: string
  description: string
  eventTypeName: string
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



export type { Person, Member, FullMember, User, Event, Address, itTicket, itTicketInfo }
