<template>
  <Card class="flex-1">
    <CardHeader>
      <Icon name="badge" class="text-6xl" />
      <span class="text-accent"> Informations du Membre </span>
    </CardHeader>
    <CardContent>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="gender">Genre</Label>
          <Input id="gender" v-model="personGender" />
        </div>
        <div class="flex-3 flex flex-col gap-2">
          <Label for="username">Prénom</Label>
          <Input id="username" v-model="personFirstname" />
        </div>
        <div class="flex-3 flex flex-col gap-2">
          <Label for="userId">Nom</Label>
          <Input id="userId" v-model="personLastname" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="email">addresse Email</Label>
          <Input type="email" id="email" v-model="personEmail" />
        </div>
        <div class="flex-3 flex flex-col gap-2">
          <Label for="phone">Numéro de téléphone</Label>
          <Input type="tel" id="phone" v-model="personMobilePhone" />
        </div>
      </div>

      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="memberId">Date de Naissance</Label>
          <Input id="nationality" v-model="temp" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="birthPlace">Lieu de naissance</Label>
          <Input id="birthPlace" v-model="memberBirthPlace" />
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <Label for="memberId">Nationalité</Label>
        <Input id="nationality" v-model="memberNationality" />
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="dept">Fillière</Label>
          <Input id="dept" v-model="memberDepartment" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="prom">Promo</Label>
          <Input id="prom" v-model="memberPromotion" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="ncotz">Numéro de cotisation</Label>
          <Input id="ncotz" v-model="memberContributionNumber" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="contrib">Date de cotisation</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[280px] justify-start text-left font-normal',
                    !memberContributionDate && 'text-muted-foreground'
                  )
                "
              >
                <Icon name="date_range" class="mr-2 h-4 w-4" />
                {{
                  memberContributionDate
                    ? df.format(memberContributionDate.toDate(getLocalTimeZone()))
                    : 'Pick a date'
                }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="memberContributionDate" initial-focus />
            </PopoverContent>
          </Popover>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="contribmeth">Payement</Label>
          <Input id="contribmeth" v-model="memberPaymentMethod" />
        </div>
      </div>

      <Button @click="editMemberData()">Modifier</Button>
    </CardContent>
  </Card>

  <Card class="flex-1">
    <CardHeader>
      <Icon name="location_on" class="text-6xl" />
      <span class="text-accent"> addresse du membre</span>
    </CardHeader>
    <CardContent>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="address">addresse</Label>
          <Input id="address" v-model="addressAddress" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="add">Complément d'addresse</Label>
          <Input id="add" v-model="addressAdditionnalAddress" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="city">Ville</Label>
          <Input id="city" v-model="addressCity" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="postCode">Code Postal</Label>
          <Input id="postCode" v-model="addressPostCode" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="country">Pays</Label>
          <Input id="country" v-model="addressCountry" />
        </div>
      </div>
      <Button @click="editaddressData()">Modifier l'addresse de l'utilisateur</Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  memberId: number
}>()

const temp = ref(22)

import {
  DateFormatter,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  now,
  type DateValue
} from '@internationalized/date'

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long'
})

// We define the data for the member

const memberBirthDate = ref<DateValue>(now(getLocalTimeZone()))
const memberBirthPlace = ref<string>('')
const memberNationality = ref<string>('')
const memberPromotion = ref<string>('')
const memberPaymentMethod = ref<string>('')
const memberDepartment = ref<string>('')
const memberMembershipNumber = ref<number>(NaN)
const memberAddressId = ref<number>(NaN)
const memberContributionDate = ref<DateValue>()
const memberContributionNumber = ref<number>(NaN)
const memberCreatedAt = ref<DateValue>(now(getLocalTimeZone()))
const memberUpdatedAt = ref<DateValue>(now(getLocalTimeZone()))

// We define the data for the person

const personLastname = ref<string>('')
const personFirstname = ref<string>('')
const personGender = ref<string>('')
const personMobilePhone = ref<string>('')
const personLandlinePhone = ref<string>('')
const personEmail = ref<string>('')
const personCreatedAt = ref<DateValue>(now(getLocalTimeZone()))
const personUpdatedAt = ref<DateValue>(now(getLocalTimeZone()))

// We define the data for the address

const addressAddress = ref<string>('')
const addressAdditionnalAddress = ref<string>('')
const addressCity = ref<string>('')
const addressPostCode = ref<string>('')
const addressCountry = ref<string>('')
const addressCreatedAt = ref<DateValue>(now(getLocalTimeZone()))
const addressUpdatedAt = ref<DateValue>(now(getLocalTimeZone()))

// We fetch the member info
axios
  .get(`/member/${props.memberId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  .then((response) => {
    const member = response.data.data.member

    memberBirthDate.value = parseAbsoluteToLocal(member.birthDate)
    memberBirthPlace.value = member.birthPlace
    memberNationality.value = member.nationality
    memberPromotion.value = member.promotion
    memberPaymentMethod.value = member.paymentMethod
    memberDepartment.value = member.department
    memberMembershipNumber.value = member.membershipNumber
    memberAddressId.value = member.addressId
    memberContributionDate.value = parseAbsoluteToLocal(member.contributionDate)
    memberCreatedAt.value = parseAbsoluteToLocal(member.createdAt)
    memberUpdatedAt.value = parseAbsoluteToLocal(member.updatedAt)

    // We fetch the address info
    axios
      .get(`/address/${member.addressId}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      })
      .then((response) => {
        const address = response.data.data.address

        addressAddress.value = address.address
        addressAdditionnalAddress.value = address.additionnalAddress
        addressCity.value = address.city
        addressPostCode.value = address.postCode
        addressCountry.value = address.country
        addressCreatedAt.value = parseAbsoluteToLocal(address.createdAt)
        addressUpdatedAt.value = parseAbsoluteToLocal(address.updatedAt)
      })
      .catch((error) => {
        console.error(error)
      })
  })
  .catch((error) => {
    console.error(error)
  })

// We fetch the person info
axios
  .get(`/person/${props.memberId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  .then((response) => {
    const person = response.data.data.person

    personLastname.value = person.lastname
    personFirstname.value = person.firstname
    personGender.value = person.gender
    personMobilePhone.value = person.mobilePhone
    personLandlinePhone.value = person.landlinePhone
    personEmail.value = person.email
    personCreatedAt.value = parseAbsoluteToLocal(person.createdAt)
    personUpdatedAt.value = parseAbsoluteToLocal(person.updatedAt)
  })
  .catch((error) => {
    console.error(error)
  })

// Function to update the member info
const editMemberData = () => {
  axios
    .put(
      `/member/${props.memberId}`,
      {
        member: {
          memberId: props.memberId,
          birthDate: memberBirthDate.value,
          birthPlace: memberBirthPlace.value,
          nationality: memberNationality.value,
          promotion: memberPromotion.value,
          contributionDate: memberContributionDate.value,
          paymentMethod: memberPaymentMethod.value,
          department: memberDepartment.value,
          membershipNumber: memberMembershipNumber.value,
          addressId: memberAddressId.value,
          createdAt: memberCreatedAt.value.toString(),
          updatedAt: memberUpdatedAt.value.toString()
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })

  axios
    .put(
      `/person/${props.memberId}`,
      {
        person: {
          personId: props.memberId,
          lastname: personLastname.value,
          firstname: personFirstname.value,
          gender: personGender.value,
          mobilePhone: personMobilePhone.value,
          landlinePhone: personLandlinePhone.value,
          email: personEmail.value,
          createdAt: personCreatedAt.value.toString(),
          updatedAt: personUpdatedAt.value.toString()
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}

const editaddressData = () => {
  axios
    .put(
      `/address/${memberAddressId.value}`,
      {
        address: {
          addressId: memberAddressId,
          address: addressAddress.value,
          additionnalAddress: addressAdditionnalAddress,
          city: addressCity.value,
          postCode: addressPostCode.value,
          country: addressCountry.value,
          createdAt: addressCreatedAt.value.toString(),
          updatedAt: addressUpdatedAt.value.toString()
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
