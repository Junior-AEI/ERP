<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Member, Person } from '@/types/api'
import axios from 'axios'

type fullMember = Member & Person

const data = ref<Member[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<fullMember[]> {
  // Fetch data from your API here.

  const members = await axios.get(`/member`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  return members.data.data?.members ?? []
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
