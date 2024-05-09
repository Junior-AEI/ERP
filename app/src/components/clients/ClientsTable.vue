<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { ClientInfo } from '@/types/api'
import axios from 'axios'

const data = ref<ClientInfo[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<ClientInfo[]> {
  // Fetch data from your API here.

  const clients = await axios.get(`/client`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const persons = await axios.get(`/person`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const ClientPerson = clients.data.data?.clients.map((client: any) => {
    const person = persons.data.data?.persons.find(
      (person: any) => person.personId === client.clientId
    )
    return {
      ...client,
      ...person
    }
  })

  const companies = await axios.get(`/company`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const addresses = await axios.get(`/address`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const CompanyWithAddress = companies.data.data?.companies.map((company: any) => {
    const address = addresses.data.data?.addresses.find(
      (address: any) => address.addressId === company.addressId
    )
    return {
      ...company,
      ...address
    }
  })

  const fullClients = ClientPerson.map((client: any) => {
    const company = CompanyWithAddress.find(
      (company: any) => company.companyId === client.companyId
    )
    return {
      ...company,
      ...client
    }
  })



  return fullClients
}

onMounted(async () => {
  data.value = await getData()
})

const handleClick = (e: any) => {
  console.log('Clicked on row:', e.target)
}
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" :onClickFn="handleClick" />
  </div>
</template>
