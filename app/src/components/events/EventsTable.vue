<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Event } from '@/types/api'

const data = ref<Event[]>([])

async function getData(): Promise<Event[]> {
  // Fetch data from your API here.
  return [
    {
      eventId: '1',
      name: 'Cocktail de passation',
      startDate: '2024-04-02',
      endDate: '2024-04-02',
      location: 'ENSEIRB-MATMECA',
      description:
        'Cocktail de passation entre les anciens et les nouveaux membres de la junior entreprise',
      eventTypeName: 'afterwork'
    },
    {
      eventId: '2',
      name: "Congrès National d'été",
      startDate: '2024-05-24',
      endDate: '2024-05-25',
      location: 'Château du Rouret',
      description: "Congrès National d'Été 2024",
      eventTypeName: 'congress'
    },
    {
      eventId: '3',
      name: 'Audit',
      startDate: '2024-04-13',
      endDate: '2024-04-13',
      location: 'ENSEIRB-MATMECA',
      description: 'Audit de la junior entreprise',
      eventTypeName: 'audit'
    }
  ]
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
