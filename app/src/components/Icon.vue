<template>
  <span class="material-symbols-rounded text-xl">
    {{ name }}
  </span>
</template>

<script lang="ts" setup>
import type { IconNames } from '@/types'

defineProps<{ name: IconNames }>()
</script>

<style>
.material-symbols-rounded {
  font-variation-settings:
    'FILL' 0,
    'wght' 300,
    'GRAD' 0,
    'opsz' 24;
  font-size: 140%;
}

.inherit-font-size {
  font-size: inherit;
}
</style>
