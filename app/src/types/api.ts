interface Person {
  personId: string
  firstname: string
  lastname: string
  gender: string
  mobilePhoneNumber: string
  landlinePhoneNumber: string
  email: string
}

interface Member extends Person {
  memberId: string
  birthDate: string
  nationality: string
  promotion: string
  contributionDate: string
  paymentMethod: string
  department: string
  telegramId: string
  createdAt: string
  updatedAt: string
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

export type { Person, Member, Event, EventTypes }
