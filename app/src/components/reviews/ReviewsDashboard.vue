<template>
  <div>
    <Wrapper class="flex h-full w-full flex-col md:flex-row">
      <div class="mt-0 flex-1">
        <Card class="flex h-full flex-col justify-between">
          <CardHeader class="font-semibold"> Relectures à effectuer </CardHeader>
          <CardContent class="flex items-center justify-center text-9xl">
            {{ dataLength }}
          </CardContent>
        </Card>
      </div>
      <div class="mx-4 hidden w-px bg-gray-300 md:block"></div>
      <div class="flex-1">
        <h2 class="mb-2">Suivi d'études</h2>
        <div class="flex flex-row flex-wrap gap-2 text-center">
          <div v-for="(item, index) in data" :key="index">
            <Card v-if="item.acronym !== 'N/C'" class="size-14 rounded-md">
              {{ item.acronym }}
            </Card>
          </div>
        </div>
      </div>
      <div class="mx-4 hidden w-px bg-gray-300 md:block"></div>
      <div class="h-36 w-full flex-1 md:w-1/2">
        <h2 class="mb-2">Dernières relectures</h2>
        <ScrollArea class="h-36 gap-4 rounded border bg-white">
          <div v-for="(item, index) in data" :key="index">
            <Card>
              <div class="m-4 ml-4 mr-4 flex flex-1 flex-row-reverse items-center gap-4">
                <div
                  class="absolute left-0 top-0 flex h-full w-1/6 items-center justify-center rounded-s-xl bg-black/30"
                >
                  {{ item.acronym }}
                </div>
                <div class="flex w-5/6 flex-col items-start justify-center">
                  <span> {{ item.type }}</span>
                </div>
              </div>
            </Card>
          </div>
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
import type { Document, DocumentType, ExtendedDocument } from '@/types/api'
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
const data = ref<ExtendedDocument[]>([])
const lastData = ref<ExtendedDocument[]>([])

const dataLength = ref(NaN)

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

const loadData = async () => {
  documents.value = await getData()
  documentTypes.value = await getDocumentType()
  data.value = documents.value
    .map((document: Document) => createExtendedDocument(document, documentTypes.value))
    .filter((ExtendedDocument) => ExtendedDocument.status === 'A relire')
  dataLength.value = data.value.length
  lastData.value = data.value
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
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
