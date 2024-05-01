<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Event } from '@/types/api'
// import { CalendarDate } from '@internationalized/date'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const data = ref<Event[]>([])

async function getData(): Promise<Event[]> {
  // Fetch data from your API here.
  const events = await axios.get(`/event`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return events.data
}
// return [
//   {
//     eventId: 1,
//     name: 'Cocktail de passation',
//     startDate: new CalendarDate(2024, 4, 2).toString(),
//     endDate: new CalendarDate(2024, 4, 2).toString(),
//     location: 'ENSEIRB-MATMECA',
//     description:
//       'Cocktail de passation entre les anciens et les nouveaux membres de la junior entreprise',
//     eventTypeName: 'afterwork'
//   },
//   {
//     eventId: 2,
//     name: "Congrès National d'été",
//     startDate: new CalendarDate(2024, 5, 23).toString(),
//     endDate: new CalendarDate(2024, 5, 25).toString(),
//     location: 'Château du Rouret',
//     description: "Congrès National d'Été 2024",
//     eventTypeName: 'congress'
//   },
//   {
//     eventId: 3,
//     name: 'Audit',
//     startDate: new CalendarDate(2024, 4, 13).toString(),
//     endDate: new CalendarDate(2024, 4, 13).toString(),
//     location: 'ENSEIRB-MATMECA',
//     description: 'Audit de la junior entreprise',
//     eventTypeName: 'audit'
//   }
// ]

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
