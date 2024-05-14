<template>
  <div>
    <div class="flex flex-1 flex-row gap-2">
      <div class="flex w-fit flex-col gap-2">
        <Wrapper class="flex w-fit flex-1 flex-col gap-2">
          <div class="flex flex-1 flex-row items-center justify-between">
            <h2 class="border-b-0 p-0">Informations</h2>
            <Button variant="outline" icon="star">Suivre l'Étude</Button>
          </div>

          <Card class="flex w-fit flex-1">
            <CardContent class="ml-3 mr-3 flex flex-1">
              <ProjectInfos v-if="infos_project" :infos="infos_project"> </ProjectInfos>
            </CardContent>
          </Card>

          <div class="flex flex-1 flex-row items-center justify-between gap-2">
            <Button variant="outline" icon="edit">Modifier l'Étude</Button>
            <Button variant="destructive" icon="archive">Archiver l'Étude</Button>
          </div>
        </Wrapper>
        <Wrapper class="min-w-sm flex flex-1 flex-col gap-2">
          <Card>
            <CardHeader class="flex flex-1 justify-between">
              <div class="flex flex-1 flex-row gap-2">
                <Icon name="description" />
                <span class="text-accent"> Documents </span>
              </div>
              <Button variant="outline" icon="add" @click="redirect()"></Button>
            </CardHeader>
            <CardContent class="flex flex-row flex-wrap">
              <DocumentCard
                class="flex-1"
                v-for="doc in extDocs.filter(
                  (document) => document.acronym === infos_project?.acronym
                )"
                :infos="doc"
                :key="doc.documentId"
              ></DocumentCard>
            </CardContent>
          </Card>
        </Wrapper>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <Wrapper class="flex flex-1 flex-col gap-4">
          <Card>
            <CardContent> </CardContent>
          </Card>

          <div class="flex h-fit flex-col gap-2">
            <h3>Notes sur l'avancement de l'Étude</h3>

            <ProjectNoteViewer :projectId="projectId"></ProjectNoteViewer>
          </div>
        </Wrapper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { type ExtendedProject } from '@/types/api'

import {
  type Document,
  type DocumentType,
  type ExtendedDocument,
  type Project,
  type Person,
  type Address,
  type ClientInfo,
  type ProjectInfo
} from '@/types/api'



const route = useRoute()
const projectId = (() => {
  if (route.query.id && typeof route.query.id === 'string') {
    console.log(route.query.id)
    return parseInt(route.query.id)
  }
  return 0
})()

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
}

const exampleAddress: Address = {
  addressId: 1,
  address: '123 Main St',
  additionnalAddress: 'Apt 4',
  city: 'Paris',
  postCode: '75000',
  country: 'France'
}

const exampleClientInfo: ClientInfo = {
  ...examplePerson,
  ...exampleAddress,
  activityField: 'IT Services',
  function: 'Project Manager',
  firstContact: '2021-01-02',
  name: 'Example Company',
  legalEntity: 'SA',
  companyId: 1,
  companyType: 'IT Services'
}

const exampleProject: Project = {
  projectId: 1,
  acronym: 'EXPRJ',
  nameProject: 'Example Project',
  startDate: '2021-01-03',
  endDate: '2021-12-31',
  clientId: 1
}

const exampleProjectInfo: ProjectInfo = {
  ...exampleProject,
  ...exampleClientInfo
}

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
  }
  // ... other contributors
]

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
  }
  // ... other project managers
]
// Deuxième exemple de projet

/* const exampleExtendedProject2: ExtendedProject = {
  ...exampleProjectInfo2,
  delta: 'This is a delta for project 2',
  contributors: exampleContributors2,
  projectManagers: exampleProjectManagers2
} */

// Troisième exemple de projet

const exampleExtendedProject: ExtendedProject = {
  ...exampleProjectInfo,
  delta: '2 jours',
  contributors: exampleContributors,
  projectManagers: exampleProjectManagers
}


import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<ExtendedProject> {
  // Fetch data from your API here.

  const project = await axios.get(`/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const client = await axios.get(`/client/${project.data.data?.project.clientId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const person = await axios.get(`/person/${project.data.data?.project.clientId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const company = await axios.get(`/company/${client.data.data?.client.companyId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const address = await axios.get(`/address/${company.data.data?.company.addressId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const persons = await axios.get(`/person`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
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

  const projectManagers = ManagerPersons.filter(
    (manager: any) => manager.projectId === project.data.data?.project.projectId
  )
  const projectContributors = ContributorPersons.filter(
    (contributor: any) => contributor.projectId === project.data.data?.project.projectId
  )

  return {
    ...client.data.data?.client,
    ...person.data.data?.person,
    ...project.data.data?.project,
    ...company.data.data?.company,
    ...address.data.data?.adress,
    projectManagers: projectManagers,
    contributors: projectContributors,
    name: company.data.data?.company.name,
    nameProject: project.data.data?.project.name
  }
}
const infos_project = ref<ExtendedProject>()

const docs = ref<Document[]>([])
const docTypes = ref<DocumentType[]>([])

const extDocs = ref<ExtendedDocument[]>([])

async function getDocuments(): Promise<Document[]> {
  // Fetch data from your API here.
  const response = await axios.get(`/document`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return response.data.data.documents
}

async function getDocumentType(): Promise<DocumentType[]> {
  const response = await axios.get(`/documentType`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return response.data.data.documentTypes
}

function createExtendedDocument(
  document: Document,
  documentTypes: DocumentType[]
): ExtendedDocument {
  const documentType = documentTypes.find((dt) => dt.typeId === document.typeId)
  const type = documentType?.type ?? ''
  const fieldNumber = documentType?.fieldNumber ?? 0
  const fieldMeaning = documentType?.fieldMeaning ?? ''
  const index = fieldMeaning.split('|').indexOf('Étude (Acronyme)')
  const acronym = index !== -1 ? document.information.split('|')[index] : 'N/C'

  return {
    ...document,
    type,
    fieldNumber,
    fieldMeaning,
    acronym
  }
}

const loadDocuments = async () => {
  docs.value = await getDocuments()
  docTypes.value = await getDocumentType()
  extDocs.value = docs.value.map((document: Document) =>
    createExtendedDocument(document, docTypes.value)
  )
}

function redirect() {
  window.location.href = '/documents'
}

onMounted(async () => {
  infos_project.value = await getData()
  if (!infos_project.value) {
    infos_project.value = exampleExtendedProject
  }
  console.log(infos_project.value)
  loadDocuments()
})
</script>
