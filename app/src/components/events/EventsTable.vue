<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Event } from '@/types/api'

const data = ref<Event[]>([])

async function getData(): Promise<Event[]> {
  // Fetch data from your API here.
  return [
    {
      eventId: 1,
      name: 'Cocktail de passation',
      startDate: new Date('2024-04-02T18:00:00.000Z'),
      endDate: new Date('2024-04-02T20:00:00.000Z'),
      location: 'ENSEIRB-MATMECA',
      description:
        'Cocktail de passation entre les anciens et les nouveaux membres de la junior entreprise',
      eventTypeName: 'afterwork'
    },
    {
      eventId: 2,
      name: "Congrès National d'été",
      startDate: new Date('2024-05-23T00:00:00.000Z'),
      endDate: new Date('2024-05-25T23:59:00.000Z'),
      location: 'Château du Rouret',
      description: "Congrès National d'Été 2024",
      eventTypeName: 'congress'
    },
    {
      eventId: 3,
      name: 'Audit',
      startDate: new Date('2024-04-13T08:00:00.000Z'),
      endDate: new Date('2024-04-13T18:00:00.000Z'),
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
