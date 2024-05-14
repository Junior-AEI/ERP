<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { columns } from './columns'
import type { EventWithDoc } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const data = ref<EventWithDoc[]>([])

const emit = defineEmits(['reloaded'])

const props = defineProps<{
  needReload?: boolean
}>()

async function getData(): Promise<EventWithDoc[]> {
  // Fetch data from your API here.
  const events = await axios.get(`/event`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const docTypes = await axios.get(`/documentType`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const typeDoc = docTypes.data.data.documentTypes.find(
              (documentType: any) => documentType.type === "Doc lié à un événement"
            )
            console.log(typeDoc)

  const documents = await axios.get(`/document`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const DocEvent = documents.data.data.documents.filter(
              (document: any) => document.typeId == typeDoc.typeId
            )

  const eventWithDocList = events.data.data?.events.map((event: any) => {
    const DocList = DocEvent.filter(
      (document: any) => document.information === event.eventId.toString()
    )
    return {
    ...event,
    documentList: DocList
    }
  })


  console.log(eventWithDocList)

  return eventWithDocList

}

async function loadData() {
  data.value = await getData()
  data.value = data.value.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
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
