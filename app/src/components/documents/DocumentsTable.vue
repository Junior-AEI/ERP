<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Document, DocumentType, DocumentFull } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const documents = ref<Document[]>([])
const documentTypes = ref<DocumentType[]>([])

const data = ref<DocumentFull[]>([])

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

onMounted(async () => {
  documents.value = await getData()
  documentTypes.value = await getDocumentType()
  data.value = documents.value.map((document: Document) =>
    createDocumentFull(document, documentTypes.value)
  )
  console.log(data)
})
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
