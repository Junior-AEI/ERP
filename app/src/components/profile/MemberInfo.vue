<template>
  <div class="flex flex-col gap-4">
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
            <Label for="birthDate">Date de Naissance</Label>
            <DatePickerComponent v-model="memberBirthDate" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="birthPlace">Lieu de naissance</Label>
            <Input id="birthPlace" v-model="memberBirthPlace" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="nationality">Nationalité</Label>
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
            <Label for="contrib">Date de cotisation</Label>
            <DatePickerComponent :disabled="!canEdit" v-model="memberContributionDate" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="contribmeth">Moyen de payement</Label>
            <Input :disabled="!canEdit" id="contribmeth" v-model="memberPaymentMethod" />
          </div>
        </div>

        <Button @click="editMemberData()">Modifier</Button>
      </CardContent>
    </Card>

    <Card class="flex-1">
      <CardHeader>
        <Icon name="location_on" class="text-6xl" />
        <span class="text-accent">Adresse du membre</span>
      </CardHeader>
      <CardContent>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="address">Adresse</Label>
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
    <Toaster />
  </div>
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

import { type DateValue } from '@internationalized/date'

const canEdit = ref(false) // to be modified when permissions are added

// We define the data for the member

const memberBirthDate = ref<DateValue>()
const memberBirthPlace = ref<string>('')
const memberNationality = ref<string>('')
const memberPromotion = ref<string>('')
const memberPaymentMethod = ref<string>('')
const memberDepartment = ref<string>('')
const memberMembershipNumber = ref<number>(NaN)
const memberAddressId = ref<number>(NaN)
const memberContributionDate = ref<DateValue>()
const memberCreatedAt = ref<DateValue>()
const memberUpdatedAt = ref<DateValue>()

// We define the data for the person

const personLastname = ref<string>('')
const personFirstname = ref<string>('')
const personGender = ref<string>('')
const personMobilePhone = ref<string>('')
const personLandlinePhone = ref<string>('')
const personEmail = ref<string>('')
const personCreatedAt = ref<DateValue>()
const personUpdatedAt = ref<DateValue>()

// We define the data for the address

const addressAddress = ref<string>('')
const addressAdditionnalAddress = ref<string>('')
const addressCity = ref<string>('')
const addressPostCode = ref<string>('')
const addressCountry = ref<string>('')
const addressCreatedAt = ref<DateValue>()
const addressUpdatedAt = ref<DateValue>()

const fetchInfos = () => {
  // We fetch the member info
  fetchMembersInfos()

  // We fetch the person info
  fetchPersonInfos()
}

const fetchAddressInfos = () => {
  axios
    .get(`/address/${props.memberId}`, {
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
      addressCreatedAt.value = address.createdAt.toString()
      addressUpdatedAt.value = address.updatedAt.toString()
    })
    .catch((error) => {
      console.error(error)
    })
}

const fetchMembersInfos = () => {
  axios
    .get(`/member/${props.memberId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      const member = response.data.data.member

      memberBirthDate.value = member.birthDate.toString()
      memberBirthPlace.value = member.birthPlace
      memberNationality.value = member.nationality
      memberPromotion.value = member.promotion
      memberPaymentMethod.value = member.paymentMethod
      memberDepartment.value = member.department
      memberMembershipNumber.value = member.membershipNumber
      memberAddressId.value = member.addressId
      memberContributionDate.value = member.contributionDate.toString()
      memberCreatedAt.value = member.createdAt.toString()
      memberUpdatedAt.value = member.updatedAt.toString()

      fetchAddressInfos()
    })
    .catch((error) => {
      console.error(error)
    })
}

const fetchPersonInfos = () => {
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
      personCreatedAt.value = person.createdAt.toString()
      personUpdatedAt.value = person.updatedAt.toString()
    })
    .catch((error) => {
      console.error(error)
    })
}

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
          createdAt: memberCreatedAt.value?.toString(),
          updatedAt: memberUpdatedAt.value?.toString()
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
        title: 'Les informations ont été mises à jour',
        description: `Les informations du membre ont été mises à jour avec succès.`
      })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Une erreur est survenue',
        variant: 'destructive',
        description: `${error.response.data.message}`
      })
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
          createdAt: personCreatedAt.value?.toString(),
          updatedAt: personUpdatedAt.value?.toString()
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
        title: 'Les informations ont été mises à jour',
        description: `Les informations de la personne ont été mises à jour avec succès.`
      })
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
          addressId: memberAddressId.value,
          address: addressAddress.value,
          additionnalAddress: addressAdditionnalAddress.value,
          city: addressCity.value,
          postCode: addressPostCode.value,
          country: addressCountry.value,
          createdAt: addressCreatedAt.value?.toString(),
          updatedAt: addressUpdatedAt.value?.toString()
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
        title: 'Les informations ont été mises à jour',
        description: `Les informations de l'addresse ont été mises à jour avec succès.`
      })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Une erreur est survenue',
        variant: 'destructive',
        description: `${error.response.data.message}`
      })
    })
}

onMounted(() => {
  fetchInfos()
})
</script>
