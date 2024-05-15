<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { itTicketWithDoc } from '@/types/api'
import axios from 'axios'

const data = ref<itTicketWithDoc[]>([])
import { useAuthStore } from '@/stores/authStore'
function delay(isoDateString: string): number {
    const currentDate = new Date().getTime(); // Convertir la date actuelle en timestamp UNIX
    const endDateTime = new Date(isoDateString).getTime();

    // Calcul de la différence en jours
    return Math.floor((endDateTime - currentDate) / (1000 * 60 * 60 * 24));
}
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

            itTickets.data.data?.itTickets.sort((expenseA: any, expenseB: any) => {
        // Récupérer les dates de fin de chaque projet
        const endDateA = new Date(expenseA.createdAt);
        const endDateB = new Date(expenseB.createdAt);
        // Calculer les délais en utilisant la fonction delay
        const delayA = delay(endDateA.toISOString());
        const delayB = delay(endDateB.toISOString());

        if (expenseA.state === "Clos"){
          if(expenseB.state === "Clos"){
            return delayB - delayA
          }
          return 1;
        }
        if(expenseB.state === "Clos"){

            return -1
          }

        // Comparer les délais et retourner le résultat de la comparaison
        return delayA - delayB;
    });          
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
