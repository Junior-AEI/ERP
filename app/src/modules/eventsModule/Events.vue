<template>
  <div>
    <div v-if="AddEvent">
      <EventsAddForm @add:event="addedEvent" @close="handleClickClose" />
    </div>
    <div>
      <h1>Tous les événements</h1>
      <Button variant="outline" @click="handleClickAdd" class="w-60"> Ajouter un nouvel événement</Button>
      <EventsTable @reloaded="reloaded" :need-reload="needReload" />
    </div>
    
    
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const needReload = ref(false)
const AddEvent = ref(false)
const addedEvent = () => {
  needReload.value = true
}

const reloaded = () => {
  needReload.value = false
}

const handleClickAdd = () => {
  AddEvent.value = true
}
const handleClickClose = () => {
  AddEvent.value = false
}
</script>
