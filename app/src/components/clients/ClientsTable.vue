<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { ClientInfoForTable } from '@/types/api'
import axios from 'axios'
import { useRouter } from 'vue-router'

const data = ref<ClientInfoForTable[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<ClientInfoForTable[]> {
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


  const projects = await axios.get(`/project`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })


  const ClientsWithProjects = fullClients.map((client: any) => {
      const clientProjects = projects.data.data?.projects.filter((project: any) => project.clientId === client.clientId);
      const Projectsname = clientProjects.map((project: any) => project.acronym);
      return { ...client, Projectsname : Projectsname, firstContact: client.firstContact };
    });


  return ClientsWithProjects
}

onMounted(async () => {
  data.value = await getData()
})

const router = useRouter()

const handleClick = (row: any) => {
  router.push({
    path: '/client/profil',
    query: { id: row.clientId, name : `${row.firstname} ${row.lastname} de ${row.name}`}
  })
}
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" @click:row="handleClick" />
  </div>
</template>
