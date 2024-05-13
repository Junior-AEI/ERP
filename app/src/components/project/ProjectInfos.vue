<template>
  <div class="flex min-w-72 max-w-md flex-1 flex-col gap-4">
    <div class="flex flex-1 items-center justify-between gap-2">
      <span>Nom : </span><span>{{ props.infos.name }}</span>
      <span class="text-muted-foreground">({{ props.infos.acronym }})</span>
    </div>
    <div class="flex flex-1 items-center justify-between gap-2">
      <span>Date : </span><span> du {{ props.infos.startDate }} au {{ props.infos.endDate }}</span>
    </div>
    <div class="flex flex-1 items-center justify-between gap-2">
      <span>Client : </span><span>{{ props.infos.firstname }} {{ props.infos.lastname }}</span>
    </div>
    <div class="flex flex-1 items-center justify-between gap-2">
      <span>Chargé d'Étude : </span
      ><span
        >{{ props.infos.projectManagers[0].firstname }}
        {{ props.infos.projectManagers[0].lastname }}</span
      >
    </div>
    <div class="flex flex-1 items-center justify-between gap-2">
      <span>Intervenants : </span
      ><span
        >{{ props.infos.contributors[0].firstname }}
        {{ props.infos.contributors[0].lastname }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type ExtendedProject } from '@/types/api'

const props = defineProps<{
  infos: ExtendedProject
}>()

console.log(props.infos)
</script>
