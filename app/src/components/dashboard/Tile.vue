<template>
  <Button :to="to" variant="outline" class="w-fit px-4 py-6">
    <Icon :name="icon" />
    <span class="font-bold">{{ name }}</span>
  </Button>
</template>

<script setup lang="ts">
import type { IconNames } from '@/types'

defineProps<{ icon: IconNames; name: string; to: string }>()
</script>
