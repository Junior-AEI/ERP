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
          <Input id="gender" v-model="personInfo.gender" />
        </div>
        <div class="flex-3 flex flex-col gap-2">
          <Label for="username">Prénom</Label>
          <Input id="username" v-model="personInfo.firstname" />
        </div>
        <div class="flex-3 flex flex-col gap-2">
          <Label for="userId">Nom</Label>
          <Input id="userId" v-model="personInfo.lastname" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="email">Adresse Email</Label>
          <Input type="email" id="email" v-model="personInfo.email" />
        </div>
        <div class="flex-3 flex flex-col gap-2">
          <Label for="phone">Numéro de téléphone</Label>
          <Input type="tel" id="phone" v-model="personInfo.mobilePhone" />
        </div>
      </div>

      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="memberId">Date de Naissance</Label>
          <Input id="nationality" v-model="temp" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="birthPlace">Lieu de naissance</Label>
          <Input id="birthPlace" v-model="memberInfo.birthPlace" />
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <Label for="memberId">Nationalité</Label>
        <Input id="nationality" v-model="memberInfo.nationality" />
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="dept">Fillière</Label>
          <Input id="dept" v-model="memberInfo.department" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="prom">Promo</Label>
          <Input id="prom" v-model="memberInfo.promotion" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="ncotz">Numéro de cotisation</Label>
          <Input id="ncotz" v-model="memberInfo.membershipNumber" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="contrib">Date de cotisation</Label>
          <Input id="contrib" v-model="temp" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="contribmeth">Payement</Label>
          <Input id="contribmeth" v-model="memberInfo.paymentMethod" />
        </div>
      </div>

      <Button @click="editMemberData()">Modifier</Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import type { Member, Person, Address } from '@/types/api'

const props = defineProps<{
  memberId: number
}>()

const temp = ref(22)

const memberInfo = ref<Member>({
  memberId: props.memberId,
  birthDate: new Date(),
  birthPlace: '',
  nationality: '',
  promotion: '',
  contributionDate: new Date(),
  paymentMethod: '',
  department: '',
  addressId: NaN,
  createdAt: new Date(),
  updatedAt: new Date(),
  membershipNumber: NaN
})

const personInfo = ref<Person>({
  personId: props.memberId,
  lastname: '',
  firstname: '',
  gender: '',
  mobilePhone: '',
  landlinePhone: '',
  email: '',
  createdAt: new Date(),
  updatedAt: new Date()
})

const addressInfo = ref<Address>({
  addressId: NaN,
  address: '',
  additionnalAddress: '',
  city: '',
  postCode: '',
  country: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  member: [],
  company: []
})

// We fetch the member info
axios
  .get(`/member/${props.memberId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  .then((response) => {
    console.log(response)
    const member = response.data.data.member

    memberInfo.value = {
      ...member,
      birthDate: new Date(member.birthDate),
      contributionDate: new Date(member.contributionDate),
      createdAt: new Date(member.createdAt),
      updatedAt: new Date(member.updatedAt)
    }

    // We fetch the address info
    axios
      .get(`/address/${member.addressId}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      })
      .then((response) => {
        const address = response.data.data.address
        console.log(address)

        addressInfo.value = {
          ...address,
          createdAt: new Date(address.createdAt),
          updatedAt: new Date(address.updatedAt)
        }
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
    console.log(response)
    const person = response.data.data.person

    personInfo.value = {
      ...person,
      createdAt: new Date(person.createdAt),
      updatedAt: new Date(person.updatedAt)
    }
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
          birthDate: memberInfo.value.birthDate.toISOString(),
          birthPlace: memberInfo.value.birthPlace,
          nationality: memberInfo.value.nationality,
          promotion: memberInfo.value.promotion,
          contributionDate: memberInfo.value.contributionDate.toISOString(),
          paymentMethod: memberInfo.value.paymentMethod,
          department: memberInfo.value.department,
          membershipNumber: memberInfo.value.membershipNumber,
          addressId: memberInfo.value.addressId,
          createdAt: memberInfo.value.createdAt.toISOString(),
          updatedAt: memberInfo.value.updatedAt.toISOString()
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
          lastname: personInfo.value.lastname,
          firstname: personInfo.value.firstname,
          gender: personInfo.value.gender,
          mobilePhone: personInfo.value.mobilePhone,
          landlinePhone: personInfo.value.landlinePhone,
          email: personInfo.value.email,
          createdAt: personInfo.value.createdAt.toISOString(),
          updatedAt: personInfo.value.updatedAt.toISOString()
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
