<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { columns } from './columns'
import type { Event } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const data = ref<Event[]>([])

const emit = defineEmits(['reloaded'])

const props = defineProps<{
  needReload?: boolean
}>()

async function getData(): Promise<Event[]> {
  // Fetch data from your API here.
  const response = await axios.get(`/event`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return response.data.data.events
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
