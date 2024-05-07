<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Document, DocumentType } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const data = ref<Document[]>([])
const documentTypes = ref<DocumentType[]>([])

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

onMounted(async () => {
  data.value = await getData()
  documentTypes.value = await getDocumentType()

  data.value = data.value.map((document) => {
    const documentTypeName =
      documentTypes.value.find((documentType) => documentType.typeId === document.typeId)?.type ??
      '' // should not be equal to ''
    return {
      ...document,
      documentTypeName
    }
  })
})
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
