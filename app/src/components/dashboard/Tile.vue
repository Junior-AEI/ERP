<template>
  <Button @click="goTo(to)" variant="outline" class="w-fit px-4 py-6">
    <Icon :name="icon" />
    <span class="font-bold">{{ name }}</span>
  </Button>
</template>

<script setup lang="ts">
import type { IconNames } from '@/types'

defineProps<{ icon: IconNames; name: string; to: string }>()

import router from '@/router'

const goTo = (to: string) => {
  if (to.startsWith('http') || to.startsWith('www') || to.startsWith('https')) {
    window.open(to)
  } else {
    router.push(to)
  }
}
</script>
