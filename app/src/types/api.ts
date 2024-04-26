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

interface User {
  userId: number
  username: string
  mandateStart: Date;
  mandateEnd: Date;
  emailJE: string
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

export type { Person, Member, User, Event, EventTypes }
