<template>
  <div :class="cn('flex h-fit gap-2 rounded-2xl bg-primary-foreground p-2', props.class)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils' 
import type { HTMLAttributes } from 'vue'


const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

</script>