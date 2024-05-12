<template>
    <div class="flex flex-col gap-2">
      <Input placeholder="Rechercher" v-model="research" />
  
      <Card class="max-h-screen ">
        <ScrollArea class="flex h-full flex-col gap-1">
          <CardContent class="h-full pr-3">
              
           <CondencedProject
              v-for="project in res"
              :infos="project"
            >
            </CondencedProject> 
  
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  import { type ClientInfo, type Client } from '@/types/api'
  import { type ProjectInfo, type Project, type Address, type Person, type ExtendedProject, type ProjectManager, type Contributor } from '@/types/api'
  import { useAuthStore } from '@/stores/authStore'
  import { SortDesc } from 'lucide-vue-next'
  import { sortingFns } from '@tanstack/vue-table'
  import { computed } from 'vue'
  



  const examplePerson: Person = {
  personId: 1,
  lastname: 'Doe',
  firstname: 'John',
  gender: 'Male',
  mobilePhone: '0612345678',
  landlinePhone: '0123456789',
  email: 'john.doe@example.com',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01'
};

const exampleAddress: Address = {
  addressId: 1,
  address: '123 Main St',
  additionnalAddress: 'Apt 4',
  city: 'Paris',
  postCode: '75000',
  country: 'France'
};

const exampleClientInfo: ClientInfo = {
  ...examplePerson,
  ...exampleAddress,
  function: 'Project Manager',
  firstContact: '2021-01-02',
  name: 'Example Company',
  legalEntity: 'SA',
  companyId: 1,
  companyType: 'IT Services'
};

const exampleProject: Project = {
  projectId: 1,
  acronym: 'EXPRJ',
  nameProject: 'Example Project',
  startDate: '2021-01-03',
  endDate: '2021-12-31',
  clientId: 1
};

const exampleProjectInfo: ProjectInfo = {
  ...exampleProject,
  ...exampleClientInfo
};

const exampleContributors: Person[] = [
  {
    personId: 2,
    lastname: 'Smith',
    firstname: 'Jane',
    gender: 'Female',
    mobilePhone: '0698765432',
    landlinePhone: '0198765432',
    email: 'jane.smith@example.com',
    createdAt: '2021-01-04',
    updatedAt: '2021-01-04'
  },
  // ... other contributors
];

const exampleProjectManagers: Person[] = [
  {
    personId: 3,
    lastname: 'Brown',
    firstname: 'Bob',
    gender: 'Male',
    mobilePhone: '0623456789',
    landlinePhone: '0123456789',
    email: 'bob.brown@example.com',
    createdAt: '2021-01-05',
    updatedAt: '2021-01-05'
  },
  // ... other project managers
];
// Deuxième exemple de projet
const examplePerson2: Person = {
  personId: 4,
  lastname: 'Doe',
  firstname: 'Alice',
  gender: 'Female',
  mobilePhone: '0612345678',
  landlinePhone: '0123456789',
  email: 'alice.doe@example.com',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01'
};

const exampleAddress2: Address = {
  addressId: 2,
  address: '456 Main St',
  additionnalAddress: 'Apt 2',
  city: 'Lyon',
  postCode: '69000',
  country: 'France'
};

const exampleClientInfo2: ClientInfo = {
  ...examplePerson2,
  ...exampleAddress2,
  function: 'Project Manager',
  firstContact: '2021-01-02',
  name: 'Example Company 2',
  legalEntity: 'SAS',
  companyId: 2,
  companyType: 'IT Services'
};

const exampleProject2: Project = {
  projectId: 2,
  acronym: 'EXPRJ2',
  nameProject: 'Example Project 2',
  startDate: '2021-02-01',
  endDate: '2022-02-28',
  clientId: 2
};

const exampleProjectInfo2: ProjectInfo = {
  ...exampleProject2,
  ...exampleClientInfo2
};

const exampleContributors2: Person[] = [
  {
    personId: 5,
    lastname: 'Smith',
    firstname: 'Charlie',
    gender: 'Male',
    mobilePhone: '0698765432',
    landlinePhone: '0198765432',
    email: 'charlie.smith@example.com',
    createdAt: '2021-02-01',
    updatedAt: '2021-02-01'
  },
  {
    personId: 6,
    lastname: 'Johnson',
    firstname: 'Emma',
    gender: 'Female',
    mobilePhone: '0611111111',
    landlinePhone: '0111111111',
    email: 'emma.johnson@example.com',
    createdAt: '2021-02-01',
    updatedAt: '2021-02-01'
  }
];

const exampleProjectManagers2: Person[] = [
  {
    personId: 7,
    lastname: 'Brown',
    firstname: 'Oliver',
    gender: 'Male',
    mobilePhone: '0623456789',
    landlinePhone: '0123456789',
    email: 'oliver.brown@example.com',
    createdAt: '2021-02-01',
    updatedAt: '2021-02-01'
  },
  {
    personId: 8,
    lastname: 'Davis',
    firstname: 'Sophia',
    gender: 'Female',
    mobilePhone: '0633333333',
    landlinePhone: '0133333333',
    email: 'sophia.davis@example.com',
    createdAt: '2021-02-01',
    updatedAt: '2021-02-01'
  }
];

const exampleExtendedProject2: ExtendedProject = {
  ...exampleProjectInfo2,
  delta: 'This is a delta for project 2',
  contributors: exampleContributors2,
  projectManagers: exampleProjectManagers2
};

// Troisième exemple de projet
const examplePerson3: Person = {
  personId: 9,
  lastname: 'Doe',
  firstname: 'Michael',
  gender: 'Male',
  mobilePhone: '0612345678',
  landlinePhone: '0123456789',
  email: 'michael.doe@example.com',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01'
};

const exampleAddress3: Address = {
  addressId: 3,
  address: '789 Main St',
  additionnalAddress: 'Apt 3',
  city: 'Marseille',
  postCode: '13000',
  country: 'France'
};

const exampleClientInfo3: ClientInfo = {
  ...examplePerson3,
  ...exampleAddress3,
  function: 'Project Manager',
  firstContact: '2021-01-02',
  name: 'Example Company 3',
  legalEntity: 'SARL',
  companyId: 3,
  companyType: 'IT Services'
};

const exampleProject3: Project = {
  projectId: 3,
  acronym: 'EXPRJ3',
  nameProject: 'Example Project 3',
  startDate: '2021-03-01',
  endDate: '2022-03-31',
  clientId: 3
};

const exampleProjectInfo3: ProjectInfo = {
  ...exampleProject3,
  ...exampleClientInfo3
};

const exampleContributors3: Person[] = [
  {
    personId: 10,
    lastname: 'Smith',
    firstname: 'Lucas',
    gender: 'Male',
    mobilePhone: '0698765432',
    landlinePhone: '0198765432',
    email: 'lucas.smith@example.com',
    createdAt: '2021-03-01',
    updatedAt: '2021-03-01'
  },
  {
    personId: 11,
    lastname: 'Johnson',
    firstname: 'Mia',
    gender: 'Female',
    mobilePhone: '0611111111',
    landlinePhone: '0111111111',
    email: 'mia.johnson@example.com',
    createdAt: '2021-03-01',
    updatedAt: '2021-03-01'
  }
];

const exampleProjectManagers3: Person[] = [
  {
    personId: 12,
    lastname: 'Brown',
    firstname: 'Ava',
    gender: 'Female',
    mobilePhone: '0623456789',
    landlinePhone: '0123456789',
    email: 'ava.brown@example.com',
    createdAt: '2021-03-01',
    updatedAt: '2021-03-01'
  },
  {
    personId: 13,
    lastname: 'Davis',
    firstname: 'Ethan',
    gender: 'Male',
    mobilePhone: '0633333333',
    landlinePhone: '0133333333',
    email: 'ethan.davis@example.com',
    createdAt: '2021-03-01',
    updatedAt: '2021-03-01'
  }
];

const exampleExtendedProject3: ExtendedProject = {
  ...exampleProjectInfo3,
  delta: 'This is a delta for project 3',
  contributors: exampleContributors3,
  projectManagers: exampleProjectManagers3
};


const exampleExtendedProject: ExtendedProject = {
  ...exampleProjectInfo,
  delta: '2 jours',
  contributors: exampleContributors,
  projectManagers: exampleProjectManagers
};



  const research = ref('')
  const results = ref<ExtendedProject[]>([])
  
  function result() {
      return projects.value.filter((project) => {
          const fields: string = Object.values(project).join(' ').toLocaleLowerCase()
          return fields.includes(research.value.toLowerCase())
        })
    }
    
    const res = computed(result)
    
    const projects = ref<ExtendedProject[]>([
])
const authStore = useAuthStore()

axios.get(`/project/`, {
    headers: {
        Authorization: `Bearer ${authStore.token}`
    }
}).then((response) => {
    projects.value.push(...response.data.data.projects)
    
    // récupérer les infos client
    projects.value.forEach(element => {
        console.log("project",element);
        
        axios.get(`/client/${element.clientId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        }).then((response1) => {

            element.clientId = response1.data.data.client.clientId
            element.function = response1.data.data.client.function
            element.firstContact = response1.data.data.client.firstContact
            element.addressId = response1.data.data.client.addressId
            element.companyId = response1.data.data.client.companyId
            element.personId = response1.data.data.client.personId
        });

        console.log("project with client",element);
        
        
        // récupérer les infos de l'entreprise
        axios.get(`/company/${element.companyId}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        }).then((response2) => {
            element.companyId = response2.data.data.company.companyId
            element.name = response2.data.data.company.name
            element.legalEntity = response2.data.data.company.legalEntity
            element.addressId = response2.data.data.company.addressId
            element.companyType = response2.data.data.company.companyType
            
            });
        
        console.log("project with company",element);
        

        // récupérer les infos personnelles du client
        axios.get(`/person/${element.clientId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        }).then((response3) => {
            element.firstname = response3.data.data.person.firstname
            element.lastname = response3.data.data.person.lastname
            element.gender = response3.data.data.person.gender
            element.mobilePhone = response3.data.data.person.mobilePhone
            element.landlinePhone = response3.data.data.person.landlinePhone
            element.email = response3.data.data.person.email

        })

        console.log("project with person (client)",element);


        // récupérer les infos de l'adresse de l'entreprise
        axios.get(`/address/${element.addressId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        }).then((response4) => {
            element.address = response4.data.data.address.address
            element.additionnalAddress = response4.data.data.address.additionnalAddress
            element.city = response4.data.data.address.city
            element.postCode = response4.data.data.address.postCode
            element.country = response4.data.data.address.country
        })

        console.log("project with address",element);
        
        const managersId = ref<ProjectManager[]>([])

        // récupérer les infos personnelles des projects managers
        console.log(`/projectManager/byProject/${element.projectId}`);
        
        axios.get(`/projectManager/byProject/${element.projectId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        }).then((response5) => {
            console.log("response manager",response5.data.data.projectManager);
            
            managersId.value = response5.data.data.projectManager
        })

        console.log("managersId",managersId.value);
        


        managersId.value.forEach((managerId) => {
            axios.get(`/person/${managerId}`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            }).then((response6) => {
                element.projectManagers.push(...response6.data.data.person)
            })
        })

        console.log("project with managers",element);
        

      // récupérer les infos personnelles des contributeurs 
        const contributorsId = ref<Contributor[]>([])
        console.log(`/contributor/byProject/${element.projectId}`);
        
        axios.get(`/contributor/byProject/${element.projectId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        }).then((response7) => {
            console.log("response contributor",response7.data.data.contributor);
            
            contributorsId.value = response7.data.data.contributor
        })
        contributorsId.value.forEach((contributorId) => {
            axios.get(`/person/${contributorId}`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            }).then((response8) => {
                element.contributors.push(response8.data.data.person)
            })
        })

        console.log("project with contributors",element);

        });
    })


    console.log("projects final", projects.value);
    


  
  </script>
  