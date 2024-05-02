<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Event } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const data = ref<Event[]>([])

async function getData(): Promise<Event[]> {
  // Fetch data from your API here.
  const response = await axios.get(`/event`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return response.data.data.events
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
