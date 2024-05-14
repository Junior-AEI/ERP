<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { itTicketWithDoc } from '@/types/api'
import axios from 'axios'

const data = ref<itTicketWithDoc[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<itTicketWithDoc[]> {
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

  const docTypes = await axios.get(`/documentType`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const typeDoc = docTypes.data.data.documentTypes.find(
              (documentType: any) => documentType.type === "Doc lié à un ticket DSI"
            )
            console.log(typeDoc)

  const documents = await axios.get(`/document`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const DocItTicket = documents.data.data.documents.filter(
              (document: any) => document.typeId == typeDoc.typeId
            )

            
  const itTicketsInfo = itTickets.data.data?.itTickets.map((itTicket: any) => {
    const user = users.data.data?.users.find((user: any) => user.userId === itTicket.userId)
    const DocList = DocItTicket.filter(
      (document: any) => document.information === itTicket.ticketId.toString()
    )
    return {
      ...user,
      ...itTicket,
      documentList: DocList
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
    <DataTable :columns="columns" :data="data" :onClickFn="handleClick" />
  </div>
</template>
