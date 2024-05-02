<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { itTicketInfo } from '@/types/api'
import axios from 'axios'

const data = ref<itTicketInfo[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<itTicketInfo[]> {
  // Fetch data from your API here.

  const itTickets = await axios.get(`/itTicket`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const users = await axios.get(`/user`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const itTicketsInfo = itTickets.data.data?.itTickets.map((itTicket: any) => {
    const user = users.data.data?.users.find((user: any) => user.userId === itTicket.userId)
    return {
      ...itTicket,
      ...user
    }
  })

  return itTicketsInfo
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
    <DataTable :columns="columns" :data="data" :onClickFn="handleClick"/>
  </div>
</template>
