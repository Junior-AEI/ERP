<template>
  <div class="flex flex-col gap-2">
    <Input placeholder="Rechercher" v-model="research" />

    <Card class="max-h-44">
      <ScrollArea class="flex h-full flex-col gap-1">
        <CardContent class="h-full pr-3">
          <CondencedClient v-for="client in res" :infos="client" :key="client.personId">
          </CondencedClient>
        </CardContent>
      </ScrollArea>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { type ClientInfo, type Client } from '@/types/api'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'

const research = ref('')
//const results = ref<ClientInfo[]>([])

function result() {
  return clients.value.filter((client) => {
    const fields: string = Object.values(client).join(' ').toLocaleLowerCase()
    return fields.includes(research.value.toLowerCase())
  })
}

const res = computed(result)

const clients = ref<ClientInfo[]>([

])
const authStore = useAuthStore()

type ClientPersonized = Client & {
  clientId: number
  personId: number
  companyId: number
}

axios
  .get(`/client/?sort=createdAt`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`
    }
  })
  .then((response) => {
    response.data.data.clients.forEach((element: ClientPersonized) => {
      element.personId = element.clientId
    })
    clients.value.push(...response.data.data.clients)
    console.log(clients.value)
    clients.value.forEach((element) => {
      axios
        .get(`/company/${element.companyId}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        .then((response) => {
          element.name = response.data.data.company.name
          element.legalEntity = response.data.data.company.legalEntity
          element.companyType = response.data.data.company.companyType
          axios
            .get(`/address/${response.data.data.company.addressId}`, {
              headers: {
                Authorization: `Bearer ${authStore.token}`
              }
            })
            .then((response) => {
              element.address = response.data.data.address.address
              element.additionnalAddress = response.data.data.address.additionnalAddress
              element.city = response.data.data.address.city
              element.postCode = response.data.data.address.postCode
              element.country = response.data.data.address.country
            })
        })

      axios
        .get(`/person/${element.personId}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        .then((response) => {
          element.firstname = response.data.data.person.firstname
          element.lastname = response.data.data.person.lastname
          element.gender = response.data.data.person.gender
          element.mobilePhone = response.data.data.person.mobilePhone
          element.landlinePhone = response.data.data.person.landlinePhone
          element.email = response.data.data.person.email
        })
    })
  })
</script>
