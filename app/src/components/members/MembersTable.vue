<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Member } from '@/types/api'
import axios from 'axios'

const data = ref<Member[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<Member[]> {
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

const handleClick = (e: any) => {
  console.log('Clicked on row:', e.target)
}
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" :onClickFn="handleClick" />
  </div>
</template>
