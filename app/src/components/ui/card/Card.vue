<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col justify-center gap-3 rounded-xl border bg-card/70 text-card-foreground shadow-sm backdrop-blur-lg ',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
