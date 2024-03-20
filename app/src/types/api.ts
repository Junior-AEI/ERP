interface Person {
  id: string
  firstname: string
  lastname: string
  gender: string
  mobilePhoneNumber: string
  landlinePhoneNumber: string
  email: string
}

interface Member extends Person {
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

export type { Person, Member }
