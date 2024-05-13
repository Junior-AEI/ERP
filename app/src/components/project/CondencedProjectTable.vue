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



  const research = ref('')
  const results = ref<ExtendedProject[]>([])
  
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


// const examplePerson: Person = {
//   personId: 1,
//   lastname: 'Doe',
//   firstname: 'John',
//   gender: 'Male',
//   mobilePhone: '0612345678',
//   landlinePhone: '0123456789',
//   email: 'john.doe@example.com',
//   createdAt: '2021-01-01',
//   updatedAt: '2021-01-01'
// }

// const exampleAddress: Address = {
//   addressId: 1,
//   address: '123 Main St',
//   additionnalAddress: 'Apt 4',
//   city: 'Paris',
//   postCode: '75000',
//   country: 'France'
// }

// const exampleClientInfo: ClientInfo = {
//   ...examplePerson,
//   ...exampleAddress,
//   activityField: 'IT Services',
//   function: 'Project Manager',
//   firstContact: '2021-01-02',
//   name: 'Example Company',
//   legalEntity: 'SA',
//   companyId: 1,
//   companyType: 'IT Services'
// }

// const exampleProject: Project = {
//   projectId: 1,
//   acronym: 'EXPRJ',
//   nameProject: 'Example Project',
//   startDate: '2021-01-03',
//   endDate: '2021-12-31',
//   clientId: 1
// }

// const exampleProjectInfo: ProjectInfo = {
//   ...exampleProject,
//   ...exampleClientInfo
// }

// const exampleContributors: Person[] = [
//   {
//     personId: 2,
//     lastname: 'Smith',
//     firstname: 'Jane',
//     gender: 'Female',
//     mobilePhone: '0698765432',
//     landlinePhone: '0198765432',
//     email: 'jane.smith@example.com',
//     createdAt: '2021-01-04',
//     updatedAt: '2021-01-04'
//   }
//   // ... other contributors
// ]

// const exampleProjectManagers: Person[] = [
//   {
//     personId: 3,
//     lastname: 'Brown',
//     firstname: 'Bob',
//     gender: 'Male',
//     mobilePhone: '0623456789',
//     landlinePhone: '0123456789',
//     email: 'bob.brown@example.com',
//     createdAt: '2021-01-05',
//     updatedAt: '2021-01-05'
//   }
//   // ... other project managers
// ]
// // Deuxième exemple de projet
// const examplePerson2: Person = {
//   personId: 4,
//   lastname: 'Doe',
//   firstname: 'Alice',
//   gender: 'Female',
//   mobilePhone: '0612345678',
//   landlinePhone: '0123456789',
//   email: 'alice.doe@example.com',
//   createdAt: '2021-01-01',
//   updatedAt: '2021-01-01'
// }

// const exampleAddress2: Address = {
//   addressId: 2,
//   address: '456 Main St',
//   additionnalAddress: 'Apt 2',
//   city: 'Lyon',
//   postCode: '69000',
//   country: 'France'
// }

// const exampleClientInfo2: ClientInfo = {
//   ...examplePerson2,
//   ...exampleAddress2,
//   activityField: 'IT Services',
//   function: 'Project Manager',
//   firstContact: '2021-01-02',
//   name: 'Example Company 2',
//   legalEntity: 'SAS',
//   companyId: 2,
//   companyType: 'IT Services'
// }

// const exampleProject2: Project = {
//   projectId: 2,
//   acronym: 'EXPRJ2',
//   nameProject: 'Example Project 2',
//   startDate: '2021-02-01',
//   endDate: '2022-02-28',
//   clientId: 2
// }

// const exampleProjectInfo2: ProjectInfo = {
//   ...exampleProject2,
//   ...exampleClientInfo2
// }

// const exampleContributors2: Person[] = [
//   {
//     personId: 5,
//     lastname: 'Smith',
//     firstname: 'Charlie',
//     gender: 'Male',
//     mobilePhone: '0698765432',
//     landlinePhone: '0198765432',
//     email: 'charlie.smith@example.com',
//     createdAt: '2021-02-01',
//     updatedAt: '2021-02-01'
//   },
//   {
//     personId: 6,
//     lastname: 'Johnson',
//     firstname: 'Emma',
//     gender: 'Female',
//     mobilePhone: '0611111111',
//     landlinePhone: '0111111111',
//     email: 'emma.johnson@example.com',
//     createdAt: '2021-02-01',
//     updatedAt: '2021-02-01'
//   }
// ]

// const exampleProjectManagers2: Person[] = [
//   {
//     personId: 7,
//     lastname: 'Brown',
//     firstname: 'Oliver',
//     gender: 'Male',
//     mobilePhone: '0623456789',
//     landlinePhone: '0123456789',
//     email: 'oliver.brown@example.com',
//     createdAt: '2021-02-01',
//     updatedAt: '2021-02-01'
//   },
//   {
//     personId: 8,
//     lastname: 'Davis',
//     firstname: 'Sophia',
//     gender: 'Female',
//     mobilePhone: '0633333333',
//     landlinePhone: '0133333333',
//     email: 'sophia.davis@example.com',
//     createdAt: '2021-02-01',
//     updatedAt: '2021-02-01'
//   }
// ]

// const exampleExtendedProject2: ExtendedProject = {
//   ...exampleProjectInfo2,
//   delta: 'This is a delta for project 2',
//   contributors: exampleContributors2,
//   projectManagers: exampleProjectManagers2
// }

// // Troisième exemple de projet
// const examplePerson3: Person = {
//   personId: 9,
//   lastname: 'Doe',
//   firstname: 'Michael',
//   gender: 'Male',
//   mobilePhone: '0612345678',
//   landlinePhone: '0123456789',
//   email: 'michael.doe@example.com',
//   createdAt: '2021-01-01',
//   updatedAt: '2021-01-01'
// }

// const exampleAddress3: Address = {
//   addressId: 3,
//   address: '789 Main St',
//   additionnalAddress: 'Apt 3',
//   city: 'Marseille',
//   postCode: '13000',
//   country: 'France'
// }

// const exampleClientInfo3: ClientInfo = {
//   ...examplePerson3,
//   ...exampleAddress3,
//   activityField: 'IT Services',
//   function: 'Project Manager',
//   firstContact: '2021-01-02',
//   name: 'Example Company 3',
//   legalEntity: 'SARL',
//   companyId: 3,
//   companyType: 'IT Services'
// }

// const exampleProject3: Project = {
//   projectId: 3,
//   acronym: 'EXPRJ3',
//   nameProject: 'Example Project 3',
//   startDate: '2021-03-01',
//   endDate: '2022-03-31',
//   clientId: 3
// }

// const exampleProjectInfo3: ProjectInfo = {
//   ...exampleProject3,
//   ...exampleClientInfo3
// }

// const exampleContributors3: Person[] = [
//   {
//     personId: 10,
//     lastname: 'Smith',
//     firstname: 'Lucas',
//     gender: 'Male',
//     mobilePhone: '0698765432',
//     landlinePhone: '0198765432',
//     email: 'lucas.smith@example.com',
//     createdAt: '2021-03-01',
//     updatedAt: '2021-03-01'
//   },
//   {
//     personId: 11,
//     lastname: 'Johnson',
//     firstname: 'Mia',
//     gender: 'Female',
//     mobilePhone: '0611111111',
//     landlinePhone: '0111111111',
//     email: 'mia.johnson@example.com',
//     createdAt: '2021-03-01',
//     updatedAt: '2021-03-01'
//   }
// ]

// const exampleProjectManagers3: Person[] = [
//   {
//     personId: 12,
//     lastname: 'Brown',
//     firstname: 'Ava',
//     gender: 'Female',
//     mobilePhone: '0623456789',
//     landlinePhone: '0123456789',
//     email: 'ava.brown@example.com',
//     createdAt: '2021-03-01',
//     updatedAt: '2021-03-01'
//   },
//   {
//     personId: 13,
//     lastname: 'Davis',
//     firstname: 'Ethan',
//     gender: 'Male',
//     mobilePhone: '0633333333',
//     landlinePhone: '0133333333',
//     email: 'ethan.davis@example.com',
//     createdAt: '2021-03-01',
//     updatedAt: '2021-03-01'
//   }
// ]

// const exampleExtendedProject3: ExtendedProject = {
//   ...exampleProjectInfo3,
//   delta: 'This is a delta for project 3',
//   contributors: exampleContributors3,
//   projectManagers: exampleProjectManagers3
// }

// const exampleExtendedProject: ExtendedProject = {
//   ...exampleProjectInfo,
//   delta: '2 jours',
//   contributors: exampleContributors,
//   projectManagers: exampleProjectManagers
// }
  
  </script>
  
