<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { columns } from './columns'
import type { Document, DocumentType, ExtendedDocument } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const emit = defineEmits(['reloaded'])

const props = defineProps<{
  needReload?: boolean
}>()

const documents = ref<Document[]>([])
const documentTypes = ref<DocumentType[]>([])

const data = ref<ExtendedDocument[]>([])

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
function delay(isoDateString: string): number {
    const currentDate = new Date().getTime(); // Convertir la date actuelle en timestamp UNIX
    const endDateTime = new Date(isoDateString).getTime();

    // Calcul de la différence en jours
    return Math.floor((endDateTime - currentDate) / (1000 * 60 * 60 * 24));
}
const loadData = async () => {
  documents.value = await getData()
  documents.value.sort((expenseA: any, expenseB: any) => {
        // Récupérer les dates de fin de chaque projet
        const endDateA = new Date(expenseA.createdAt);
        const endDateB = new Date(expenseB.createdAt);
        // Calculer les délais en utilisant la fonction delay
        const delayA = delay(endDateA.toISOString());
        const delayB = delay(endDateB.toISOString());

        if (expenseA.status === "Sans Relecture"){
          if(expenseB.status === "Sans Relecture"){
            return delayB - delayA
          }
          return 1;
        }
        if(expenseB.status === "Sans Relecture"){

            return -1
          }
        
        // Comparer les délais et retourner le résultat de la comparaison
        return delayA - delayB;
    });       

  documentTypes.value = await getDocumentType()
  data.value = documents.value.map((document: Document) =>
    createExtendedDocument(document, documentTypes.value)
  )
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

<template>
  <div>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
