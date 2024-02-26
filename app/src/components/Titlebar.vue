<template>
  <div class="flex h-10 w-full justify-between border-b bg-primary-foreground">
    <div class="test-base flex items-center text-lg">
      <Icon name="folder" variant="clickable" />
      <span class="text-sm text-primary">
        {{ routeName }}
      </span>
    </div>
    <img src="/logo.svg" alt="logo" class="mr-4" />
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
