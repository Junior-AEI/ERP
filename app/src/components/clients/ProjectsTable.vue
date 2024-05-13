<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columnsProject'
import type { ProjectInfo, ExtendedProject } from '@/types/api'
import axios from 'axios'
import { useRouter } from 'vue-router'

const data = ref<ExtendedProject[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<ExtendedProject[]> {
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

  const fullProject = projects.data.data?.projects.map((project: any) => {
    const client = fullClients.find(
      (client: any) => client.clientId === client.clientId
    )
    return {
      nameProject : project.name,
      ...project,
      ...client,
    }
  })

  const managers = await axios.get(`/projectManager`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const ManagerPersons = managers.data.data?.projectManagers.map((manager: any) => {
    const person = persons.data.data?.persons.find(
      (person: any) => person.personId === manager.userId
    )
    return {
      ...manager,
      ...person
    }
  })


  const contributors = await axios.get(`/contributor`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const ContributorPersons = contributors.data.data?.contributors.map((contributor: any) => {
    const person = persons.data.data?.persons.find(
      (person: any) => person.personId === contributor.memberId
    )
    return {
      ...contributor,
      ...person
    }
  })
  const ProjectWithAllInfo = fullProject.map((project: any) => {
      const projectManagers = ManagerPersons.filter((manager: any) => manager.projectId === project.projectId);
      const projectContributors = ContributorPersons.filter((contributor: any) => contributor.projectId === project.projectId);
      return { ...project, projectManagers : projectManagers, contributors: projectContributors };
    });


  return ProjectWithAllInfo
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
