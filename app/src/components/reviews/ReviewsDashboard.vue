<template>
  <div>
    <Wrapper class="h-full w-full">
      <div class="mt-0">
        <Card class="flex h-full flex-col justify-between">
          <CardHeader class="font-semibold"> Relectures à effectuer </CardHeader>
          <CardContent class="flex items-center justify-center text-9xl">
            {{ dataLength }}
          </CardContent>
        </Card>
      </div>
      <div class="mx-4 w-px bg-gray-300"></div>
      <div>
        <h2 class="mb-2">Suivi d'études</h2>
        <div class="grid grid-cols-3 gap-2 text-center">
          <Card class="size-14 rounded-md"> ABC1 </Card>
          <Card class="size-14 rounded-md"> ABC2 </Card>
          <Card class="size-14 rounded-md"> DEF </Card>
        </div>
      </div>
      <div class="mx-4 w-px bg-gray-300"></div>
      <div class="h-36 w-1/2">
        <h2 class="mb-2">Dernières relectures</h2>
        <ScrollArea class="h-36 gap-4 rounded border bg-white">
          <Card>
            <div class="m-4 ml-4 mr-4 flex flex-1 flex-row-reverse items-center gap-4">
              <div
                class="absolute left-0 top-0 flex h-full w-1/6 items-center justify-center rounded-s-xl bg-black/30"
              >
                ABC1
              </div>
              <div class="flex w-5/6 flex-col items-start justify-center">
                <span>Convention d'Étude</span>
              </div>
            </div>
          </Card>
          <Card>
            <div class="m-4 ml-4 mr-4 flex flex-1 flex-row-reverse items-center gap-4">
              <div
                class="absolute left-0 top-0 flex h-full w-1/6 items-center justify-center rounded-s-xl bg-black/30"
              >
                ABC2
              </div>
              <div class="flex w-5/6 flex-col items-start justify-center">
                <span>Avenant à la convention d'Étude</span>
              </div>
            </div>
          </Card>
          <Card>
            <div class="m-4 ml-4 mr-4 flex flex-1 flex-row-reverse items-center gap-4">
              <div
                class="absolute left-0 top-0 flex h-full w-1/6 items-center justify-center rounded-s-xl bg-black/30"
              >
                ABC1
              </div>
              <div class="flex w-5/6 flex-col items-start justify-center">
                <span>Convention d'Étude</span>
              </div>
            </div>
          </Card>
        </ScrollArea>
      </div>
    </Wrapper>
  </div>
  <div>
    <h1>Documents à relire</h1>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { columns } from './columns'
import type { Document, DocumentType, DocumentFull } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const emit = defineEmits(['reloaded'])

const props = defineProps<{
  needReload?: boolean
}>()

const documents = ref<Document[]>([])
const documentTypes = ref<DocumentType[]>([])
const data = ref<DocumentFull[]>([])

const dataLength = ref(data.value.length)

async function getData(): Promise<Document[]> {
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

function createDocumentFull(document: Document, documentTypes: DocumentType[]): DocumentFull {
  const documentType = documentTypes.find((dt) => dt.typeId === document.typeId)
  const type = documentType?.type ?? ''
  const fieldNumber = documentType?.fieldNumber ?? 0
  const fieldMeaning = documentType?.fieldMeaning ?? ''

  return {
    ...document,
    type,
    fieldNumber,
    fieldMeaning
  }
}

const loadData = async () => {
  documents.value = await getData()
  documentTypes.value = await getDocumentType()
  data.value = documents.value
    .map((document: Document) => createDocumentFull(document, documentTypes.value))
    .filter((documentFull) => documentFull.status === 'A relire')
}

onMounted(async () => {
  loadData()
})

watch(
  () => props.needReload,
  async (value) => {
    if (value) {
      loadData()
      emit('reloaded')
    }
  }
)
</script>
