<template>
  <Card>
    <CardContent>
      <div class="flex flex-1 flex-col justify-start">
        <h3>Nom de l'événement</h3>
        <div class="flex flex-1 flex-row items-center justify-between">
          <span> Date début - Date fin</span>
        </div>
        <div class="flex flex-1 flex-row items-center justify-between">
          <span> Type d'événement</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import { ref, defineProps } from 'vue'

// const props = defineProps<{
//   item: Event
// }>()

// const eventInfo = ref<Event>(props.item)
</script>
