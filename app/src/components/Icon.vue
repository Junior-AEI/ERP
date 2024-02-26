<template>
  <Button variant="link" class="inherit-font-size" v-if="variant === 'clickable'">
    <span class="material-symbols-rounded text-xl">
      {{ name }}
    </span>
  </Button>
  <span class="material-symbols-rounded text-xl" v-else>
    {{ name }}
  </span>
</template>

<script lang="ts" setup>
import type { IconNames } from '@/types'

type VariantType = 'clickable' | undefined

defineProps<{ name: IconNames; variant?: VariantType }>()
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
