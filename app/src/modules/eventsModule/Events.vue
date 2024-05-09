<template>
  <div>
    <div>
      <EventsAddForm @add:event="addedEvent" />
    </div>
    <div>
      <h1>Prochains événements</h1>
      <EventsTable @reloaded="reloaded" :need-reload="needReload" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const needReload = ref(false)

const addedEvent = () => {
  needReload.value = true
}

const reloaded = () => {
  needReload.value = false
}
</script>
