<template>
  <Card class="flex-1">
    <CardHeader class="flex justify-between items-center">
      <div class="flex items-center">
        <Icon name="badge" class="text-6xl" />
        <span class="text-accent"> Informations du Membre </span>
      </div>
      <Button class="ml-5" variant="outline" v-if="!canEdit" @click="handleClickModif">Passer en mode Modif</Button>

      <Button class="ml-5" v-if="canEdit" @click="handleClickValidate">Valider les modifications</Button>

    </CardHeader>
    <CardContent>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="lastname">Nom</Label>
          <Input :disabled="!canEdit" id="lastname" v-model="form.lastname" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="firstname">Prénom</Label>
          <Input :disabled="!canEdit" id="firstname" v-model="form.firstname" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="gender">Genre</Label>
          <div class="flex flex-1 flex-row gap-2">
            <Input disabled v-if="!canEdit" id="firstname" v-model="form.gender" />
            <div v-if="canEdit">
              <Select v-model="form.gender" >
                <SelectTrigger>
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="M"> Homme </SelectItem>
                    <SelectItem value="F"> Femme </SelectItem>
                    <SelectItem value="O"> Autre </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="birthDate">Date de naissance</Label>
          <div class="flex flex-1 flex-row gap-2">
            <DatePickerComponent :disabled="!canEdit" v-model="birthDateFormat" />

          </div>
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="birthPlace">Lieu de naissance</Label>
          <Input :disabled="!canEdit" id="birthPlace" v-model="form.birthPlace" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="nationality">Nationalité</Label>
          <Input :disabled="!canEdit" id="nationality" v-model="form.nationality" />
        </div>
      </div>

      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="department">Filière</Label>
          <div class="flex flex-1 flex-row gap-2">
            <Input disabled v-if="!canEdit" id="firstname" v-model="form.department" />
            <div v-if="canEdit">
              <Select v-model="form.department" >
                <SelectTrigger>
                  <SelectValue placeholder="Filière" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Informatique"> Info </SelectItem>
                    <SelectItem value="Telecommunication"> Telecom </SelectItem>
                    <SelectItem value="Matmeca"> Matmeca </SelectItem>
                    <SelectItem value="Electronique"> Elec </SelectItem>
                    <SelectItem value="R&I"> R&I </SelectItem>
                    <SelectItem value="SEE"> SEE </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="promotion">Promo</Label>
          <Input :disabled="!canEdit" id="promotion" :placeholder="new Date().getFullYear() + 2"
            v-model="form.promotion" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="mobilePhone">N° de Téléphone Mobile</Label>
          <Input id="mobilePhone" :disabled="!canEdit" placeholder="Info" v-model="form.mobilePhone" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="landlinePhone">N° de Téléphone</Label>
          <Input id="landlinePhone" :disabled="!canEdit" placeholder="Tel Fixe" v-model="form.landlinePhone" />
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="landlinePhone">Email</Label>
          <Input id="landlinePhone" :disabled="!canEdit" placeholder="Tel Fixe" v-model="form.email" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="paymentMethod">Moyen de paiement de la Cotisation</Label>
          <div class="flex flex-1 flex-row gap-2">
            <Input disabled v-if="!canEdit" id="firstname" v-model="form.paymentMethod" />
            <div v-if="canEdit">

              <Select v-model="form.paymentMethod" >
                <SelectTrigger>
                  <SelectValue placeholder="Moyen de Payement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="HelloAsso"> Hello Asso </SelectItem>
                    <SelectItem value="LydiaPro"> Lydia Pro </SelectItem>
                    <SelectItem value="Vir"> Virement </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="membershipNumber">Numéro de cotisation</Label>
          <Input id="membershipNumber" :disabled="!canEdit" v-model="form.membershipNumber" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="contributionDate">Date de cotisation</Label>

          <DatePickerComponent :disabled="!canEdit" v-model="contributionDateFormat" />


        </div>
      </div>

      <div class="flex justify-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="membershipNumber">@Telegram</Label>
          <Input id="membershipNumber" :disabled="!canEdit" v-model="form.telegramId" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="contributionDate">Chat ID (Pour connexion Bot Telegram)</Label>
          <Input id="membershipNumber" :disabled="!canEdit" v-model="form.chatBotId" />
        </div>
      </div>
    </CardContent>
  </Card>
  <Toaster />
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { onMounted, ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'

const props = defineProps<{
  memberId: number
}>()

const { toast } = useToast()
import type { FullMemberWithAdress } from '@/types/api'

import {
  CalendarDateTime,
  parseDateTime,
  DateFormatter,
  getLocalTimeZone,
  type DateValue,
  parseAbsoluteToLocal
} from '@internationalized/date'

const canEdit = ref(false) // to be modified when permissions are added
const ModifyGender = ref(false)
const ModifyContributionDate = ref(false)
const ModifyDepartment = ref(false)
const ModifyPaymentMethod = ref(false)
const ModifyBirthDate = ref(false)

const contributionDateFormat = ref<DateValue>()
const birthDateFormat = ref<DateValue>()
const contributionDateString = ref<string>()
const birthDateString = ref<string>()

const handleModifyGender = () => {
  ModifyGender.value = true
}

const handleModifyDepartment = () => {
  ModifyDepartment.value = true
}

const handleModifyContributionDate = () => {
  ModifyContributionDate.value = true
}

const handleModifyPaymentMethod = () => {
  ModifyPaymentMethod.value = true
}
const handleModifyBirthDate = () => {
  ModifyBirthDate.value = true
}

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long'
})

function convertToCalendarDate(isoDateString: string): string {
  console.log(isoDateString)
  const dateObject = new Date(isoDateString)

  // Check if the date object is valid
  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid date string')
  }

  // Extract year, month, and day from the date object
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1 // Months are 0-based in JavaScript
  const day = dateObject.getDate()
  const hour = dateObject.getHours()
  const minute = dateObject.getMinutes()
  // Create and return a new CalendarDate object
  return new CalendarDateTime(year, month, day, hour, minute).toString()
}

const form = ref<FullMemberWithAdress>({
  personId: NaN,
  lastname: '',
  firstname: '',
  gender: '',
  mobilePhone: '',
  landlinePhone: '',
  email: '',

  memberId: NaN,
  birthDate: '',
  birthPlace: '',
  nationality: '',
  promotion: '',
  contributionDate: '',
  paymentMethod: '',
  department: '',
  membershipNumber: NaN,
  telegramId: '',
  chatBotId: '',

  addressId: NaN,
  address: '',
  additionnalAddress: '',
  city: '',
  postCode: '',
  country: '',
  createdAt: '',
  updatedAt: ''
})
async function fetchInfos() {
  // We fetch the person info
  await fetchPersonInfos()
  // We fetch the member info
  await fetchMembersInfos()

  contributionDateString.value = convertToCalendarDate(form.value.contributionDate)
  contributionDateString.value = df.format(
    parseDateTime(contributionDateString.value).toDate(getLocalTimeZone())
  )
  birthDateString.value = convertToCalendarDate(form.value.birthDate)
  birthDateString.value = df.format(parseDateTime(birthDateString.value).toDate(getLocalTimeZone()))
}

async function fetchMembersInfos() {
  await axios
    .get(`/member/${props.memberId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      const member = response.data.data.member

      birthDateFormat.value = parseAbsoluteToLocal(member.birthDate)
      contributionDateFormat.value = parseAbsoluteToLocal(member.contributionDate)
      form.value.birthDate = member.birthDate
      form.value.birthPlace = member.birthPlace
      form.value.nationality = member.nationality
      form.value.promotion = member.promotion
      form.value.contributionDate = member.contributionDate
      form.value.department = member.department
      form.value.membershipNumber = member.membershipNumber
      form.value.addressId = member.addressId
      form.value.paymentMethod = member.paymentMethod
      form.value.telegramId = member.telegramId
      form.value.chatBotId = member.chatBotId
    })
    .catch((error) => {
      console.error(error)
    })
}

async function fetchPersonInfos() {
  await axios
    .get(`/person/${props.memberId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      const person = response.data.data.person
      form.value.personId = person.personId
      form.value.lastname = person.lastname
      form.value.firstname = person.firstname
      form.value.gender = person.gender
      form.value.mobilePhone = person.mobilePhone
      form.value.landlinePhone = person.landlinePhone
      form.value.email = person.email
      form.value.createdAt = person.createdAt.toString()
      form.value.updatedAt = person.updatedAt.toString()
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  fetchInfos()
})

async function updatePerson() {
  await axios
    .put(
      `/person/${form.value.personId}`,
      {
        person: {
          lastname: form.value.lastname,
          firstname: form.value.firstname,
          gender: form.value.gender,
          mobilePhone: form.value.mobilePhone,
          landlinePhone: form.value.landlinePhone,
          email: form.value.email
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then(() => {
      toast({
        title: 'PErsonne renseignée',
        description: `${form.value.personId}`
      })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Something wrong happened',
        variant: 'destructive',
        description: `${error.response.data.message}`
      })
    })
}

async function updateMember() {
  if (contributionDateFormat.value) {
    form.value.contributionDate = contributionDateFormat.value.toString()
  }
  if (typeof form.value.membershipNumber == 'string') {
    form.value.membershipNumber = parseInt(form.value.membershipNumber)
  }
  if (birthDateFormat.value) {
    form.value.birthDate = birthDateFormat.value.toString()
  }
  await axios
    .put(
      `/member/${form.value.personId}`,
      {
        member: {
          memberId: form.value.personId,
          birthDate: form.value.birthDate,
          birthPlace: form.value.birthPlace,
          nationality: form.value.nationality,
          promotion: form.value.promotion,
          contributionDate: form.value.contributionDate,
          department: form.value.department,
          membershipNumber: form.value.membershipNumber,
          addressId: form.value.addressId,
          paymentMethod: form.value.paymentMethod,
          telegramId: form.value.telegramId,
          chatBotId: form.value.chatBotId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then(() => {
      canEdit.value = false
      toast({
        title: 'Personne modifiée'
      })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Something wrong happened',
        variant: 'destructive',
        description: `${error.response.data.message}`
      })
    })
}

const handleClickValidate = () => {
  updatePerson()
  updateMember()

}
const handleClickModif = () => {
  canEdit.value = true
}
</script>
