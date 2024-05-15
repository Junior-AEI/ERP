<template>
  <div class="flex flex-col gap-2">
    <Input placeholder="Rechercher" v-model="research" />

    <Card class="max-h-screen">
      <ScrollArea class="flex h-full flex-col gap-1">
        <CardContent class="h-full pr-3">
          <CondencedProject v-for="project in res" :infos="project" :key="project.projectId">
          </CondencedProject>
        </CardContent>
      </ScrollArea>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { type ExtendedProject } from '@/types/api'
import { useAuthStore } from '@/stores/authStore'

import { computed } from 'vue'


  const research = ref('')
  const results = ref<ExtendedProject[]>([])
  

  function result() {
  return results.value.filter((project) => {
    const fields: string = Object.values(project).join(' ').toLocaleLowerCase()
    return fields.includes(research.value.toLowerCase())
  })
}

const res = computed(result)

function delay(isoDateString: string): number {
    const currentDate = new Date().getTime(); // Convertir la date actuelle en timestamp UNIX
    const endDateTime = new Date(isoDateString).getTime();

    // Calcul de la différence en jours
    return Math.floor((endDateTime - currentDate) / (1000 * 60 * 60 * 24));
}
    
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
    const client = fullClients.find((client: any) => client.clientId === client.clientId)
    return {
      nameProject: project.name,
      ...project,
      ...client
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
    const projectManagers = ManagerPersons.filter(
      (manager: any) => manager.projectId === project.projectId
    )
    const projectContributors = ContributorPersons.filter(
      (contributor: any) => contributor.projectId === project.projectId
    )
    return { ...project, projectManagers: projectManagers, contributors: projectContributors }
  })

    ProjectWithAllInfo.sort((projectA: any, projectB: any) => {
        // Récupérer les dates de fin de chaque projet
        const endDateA = new Date(projectA.endDate);
        const endDateB = new Date(projectB.endDate);

        // Calculer les délais en utilisant la fonction delay
        const delayA = delay(endDateA.toISOString());
        const delayB = delay(endDateB.toISOString());

        if ((delayA < 0 )||(delayB < 0)){
          return delayB - delayA;
        }
        
        // Comparer les délais et retourner le résultat de la comparaison
        return delayA - delayB;
    });
  return ProjectWithAllInfo
}
onMounted(async () => {
  results.value = await getData()
  // Trier les projets en fonction de la valeur retournée par la fonction delay appliquée à la valeur endDate
  
})

  </script>
  
