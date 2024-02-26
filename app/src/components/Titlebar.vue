<template>
  <div class="flex h-10 w-full justify-between border-b bg-primary-foreground px-4">
    <div class="flex items-center gap-2 text-sm">
      <Icon name="folder" />
      <span class="text-primary">
        {{ routeName }}
      </span>
    </div>
    <img src="/logo.svg" alt="logo" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routeName = computed(() => {
  return route.name
})
</script>
