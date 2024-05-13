<template>
  <Card>
    <div class="m-2 ml-4 mr-4 flex flex-1 flex-row-reverse items-center gap-4">
      <div
        class="absolute left-0 top-0 flex h-full w-1/6 items-center justify-center rounded-s-xl bg-black/30"
      >
        {{ props.acronym }}
      </div>
      <div class="flex w-5/6 flex-col items-start justify-center">
        <h3>{{ props.advancement }}</h3>
        <span>{{ props.comment }}</span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  acronym: string
  advancement: string
  comment: string
}>()
</script>
