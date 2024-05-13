<template>
  <div class="flex flex-col gap-2">
    <Input placeholder="Rechercher" v-model="research" />

    <Card class="max-h-screen">
      <ScrollArea class="flex h-full flex-col gap-1">
        <CardContent class="h-full pr-3">
          <CondencedProject v-for="project in results" :infos="project" :key="project.projectId">
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

// Deuxième exemple de projet

const research = ref('')
const results = ref<ExtendedProject[]>([])

//   function result() {
//       return projects.value.filter((project) => {
//           const fields: string = Object.values(project).join(' ').toLocaleLowerCase()
//           return fields.includes(research.value.toLowerCase())
//         })
//     }

//     const res = computed(result)

//     const projects = ref<ExtendedProject[]>([
// ])
// const authStore = useAuthStore()

// axios.get(`/project/`, {
//     headers: {
//         Authorization: `Bearer ${authStore.token}`
//     }
// }).then((response) => {
//     projects.value.push(...response.data.data.projects)

//     // récupérer les infos client
//     projects.value.forEach(element => {
//         console.log("project",element);

//         axios.get(`/client/${element.clientId}`, {
//             headers: {
//                 Authorization: `Bearer ${authStore.token}`
//             }
//         }).then((response1) => {

//             element.clientId = response1.data.data.client.clientId
//             element.function = response1.data.data.client.function
//             element.firstContact = response1.data.data.client.firstContact
//             element.addressId = response1.data.data.client.addressId
//             element.companyId = response1.data.data.client.companyId
//             element.personId = response1.data.data.client.personId
//         });

//         console.log("project with client",element);

//         // récupérer les infos de l'entreprise
//         axios.get(`/company/${element.companyId}`, {
//           headers: {
//             Authorization: `Bearer ${authStore.token}`
//           }
//         }).then((response2) => {
//             element.companyId = response2.data.data.company.companyId
//             element.name = response2.data.data.company.name
//             element.legalEntity = response2.data.data.company.legalEntity
//             element.addressId = response2.data.data.company.addressId
//             element.companyType = response2.data.data.company.companyType

//             });

//         console.log("project with company",element);

//         // récupérer les infos personnelles du client
//         axios.get(`/person/${element.clientId}`, {
//             headers: {
//                 Authorization: `Bearer ${authStore.token}`
//             }
//         }).then((response3) => {
//             element.firstname = response3.data.data.person.firstname
//             element.lastname = response3.data.data.person.lastname
//             element.gender = response3.data.data.person.gender
//             element.mobilePhone = response3.data.data.person.mobilePhone
//             element.landlinePhone = response3.data.data.person.landlinePhone
//             element.email = response3.data.data.person.email

//         })

//         console.log("project with person (client)",element);

//         // récupérer les infos de l'adresse de l'entreprise
//         axios.get(`/address/${element.addressId}`, {
//             headers: {
//                 Authorization: `Bearer ${authStore.token}`
//             }
//         }).then((response4) => {
//             element.address = response4.data.data.address.address
//             element.additionnalAddress = response4.data.data.address.additionnalAddress
//             element.city = response4.data.data.address.city
//             element.postCode = response4.data.data.address.postCode
//             element.country = response4.data.data.address.country
//         })

//         console.log("project with address",element);

//         const managersId = ref<ProjectManager[]>([])

//         // récupérer les infos personnelles des projects managers
//         console.log(`/projectManager/byProject/${element.projectId}`);

//         axios.get(`/projectManager/byProject/${element.projectId}`, {
//             headers: {
//                 Authorization: `Bearer ${authStore.token}`
//             }
//         }).then((response5) => {
//             console.log("response manager",response5.data.data.projectManager);

//             managersId.value = response5.data.data.projectManager
//         })

//         console.log("managersId",managersId.value);

//         managersId.value.forEach((managerId) => {
//             axios.get(`/person/${managerId}`, {
//                 headers: {
//                     Authorization: `Bearer ${authStore.token}`
//                 }
//             }).then((response6) => {
//                 element.projectManagers.push(...response6.data.data.person)
//             })
//         })

//         console.log("project with managers",element);

//       // récupérer les infos personnelles des contributeurs
//         const contributorsId = ref<Contributor[]>([])
//         console.log(`/contributor/byProject/${element.projectId}`);

//         axios.get(`/contributor/byProject/${element.projectId}`, {
//             headers: {
//                 Authorization: `Bearer ${authStore.token}`
//             }
//         }).then((response7) => {
//             console.log("response contributor",response7.data.data.contributor);

//             contributorsId.value = response7.data.data.contributor
//         })
//         contributorsId.value.forEach((contributorId) => {
//             axios.get(`/person/${contributorId}`, {
//                 headers: {
//                     Authorization: `Bearer ${authStore.token}`
//                 }
//             }).then((response8) => {
//                 element.contributors.push(response8.data.data.person)
//             })
//         })

//         console.log("project with contributors",element);

//         });
//     })

//     console.log("projects final", projects.value);

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

  return ProjectWithAllInfo
}
onMounted(async () => {
  results.value = await getData()
})
</script>
