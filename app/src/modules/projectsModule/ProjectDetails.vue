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
              <ProjectInfos :infos="infos_project"> </ProjectInfos>
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
              <Button variant="outline" icon="add"></Button>
            </CardHeader>
            <CardContent class="flex flex-row flex-wrap">
              <DocumentCard
                class="flex-1"
                v-for="doc in documents"
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
import { ref } from 'vue'
import { type ExtendedProject } from '@/types/api'

import {
  type ExtendedDocument,
  type Project,
  type Person,
  type Address,
  type ClientInfo,
  type ProjectInfo
} from '@/types/api'

function convertToNumber(input: string | string[]): number {
  if (Array.isArray(input)) {
    // C'est un tableau de chaînes de caractères, donc nous devons convertir chaque élément en nombre
    return input.map((str) => Number(str))[0]
  } else {
    // C'est une chaîne de caractères unique, donc nous la convertissons simplement en nombre
    return Number(input)
  }
}

const route = useRoute()
const projectId = convertToNumber(route.params.projectId)

const exampleDocument: ExtendedDocument = {
  documentId: 1,
  name: 'Example Document',
  type: 'PDF',
  path: 'example.pdf',
  version: 1,
  createdAt: '2021-01-01',
  typeId: 1, // Replace with the actual type ID
  information: 'Example information',
  status: 'Example status',
  authorId: 1, // Replace with the actual author ID
  fieldNumber: 3,
  fieldMeaning: 'Example field meaning',
  acronym: 'ABC'
}

const documents = ref<ExtendedDocument[]>([exampleDocument])

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

const infos = ref<ExtendedProject>()

axios
  .get(`/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((response) => {
    infos.value = response.data.data.project
  })
  .catch((error) => {
    console.log(error)
  })

const infos_project = ref<ExtendedProject>(exampleExtendedProject)
</script>
