<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!-- <div :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)"> -->
  <div
    :class="
      cn(
        'flex flex-col justify-center gap-3 rounded-lg border bg-card/70 p-3 text-card-foreground shadow-sm backdrop-blur-lg ',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
