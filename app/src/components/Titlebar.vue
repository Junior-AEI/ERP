<template>
  <div class="flex h-12 w-full items-center justify-between border-b bg-primary-foreground px-4">
    <div class="flex items-center gap-2 text-sm">
      <Icon :name="icon" />
      <span class="text-primary">
        {{ routeName }}
      </span>
    </div>
    <img
      @click="$router.push({ path: '/' })"
      src="/logo.svg"
      alt="logo"
      class="h-full cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
import type { IconNames } from '@/types'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const icon = computed<IconNames>(() => (route.meta['icon'] as IconNames) ?? 'draft')
</script>
