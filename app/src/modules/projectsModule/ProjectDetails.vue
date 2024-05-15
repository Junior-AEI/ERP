<template>
  <div>
    <div class="flex flex-1 flex-row gap-2">
      <div class="flex w-fit flex-col gap-2">
        <Wrapper class="flex w-fit flex-1 flex-col gap-2">
          <div class="flex flex-1 flex-row items-center justify-between">
            <h2 class="border-b-0 p-0">Informations</h2>
            <!-- <Button variant="outline" icon="star">Suivre l'Étude</Button> -->
          </div>

          <Card class="flex w-fit flex-1">
            <CardContent class="ml-3 mr-3 flex flex-1">
              <ProjectInfos v-if="infos_project" :infos="infos_project" @update:project="updatedProject"> </ProjectInfos>
            </CardContent>
          </Card>

          <div class="flex flex-1 flex-row items-center justify-between gap-2">
            <!-- <Button variant="outline" icon="edit">Modifier l'Étude</Button> -->
            <!-- <Button variant="destructive" icon="archive">Archiver l'Étude</Button> -->
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
import { ref, onMounted , watch} from 'vue'
import { type ExtendedProject } from '@/types/api'

import {
  type Document,
  type DocumentType,
  type ExtendedDocument,
} from '@/types/api'

const needReload = ref(false)

const updatedProject = () => {
  console.log("Test")
  needReload.value = true
}

const reloaded = () => {
  needReload.value = false
}

onMounted(async () => {
  getData()
})

watch(
  () => needReload.value,
  async (value) => {
    if (value) {
      infos_project.value = await getData()
      reloaded()
    }
  }
)

const route = useRoute()
const projectId = (() => {
  if (route.query.id && typeof route.query.id === 'string') {
    console.log(route.query.id)
    return parseInt(route.query.id)
  }
  return 0
})()


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
  console.log(infos_project.value)
  loadDocuments()
})
</script>
