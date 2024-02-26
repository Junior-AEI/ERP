<template>
  <div class="flex w-full flex-col gap-3 px-6 py-5 sm:w-80">
    <div class="flex w-full justify-between">
      <Link to="/profile" icon="person" :variant="matchRoute('profile')">Hugo Bastien</Link>
      <Button icon="chevron_left" variant="link" @click="$emit('reduce')"></Button>
    </div>

    <Input @click="$emit('search')" placeholder="Rechercher" />
  </div>
</template>

<script setup lang="ts">
defineEmits(['reduce', 'search', 'logout'])

import useMatchRoute from '@/composables/useMatchRoute'

const matchRoute = (route: string) => (useMatchRoute(route) ? 'active' : 'default')
</script>
