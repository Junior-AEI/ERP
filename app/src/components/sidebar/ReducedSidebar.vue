<template>
  <div class="flex w-20 flex-col py-3">
    <div class="flex flex-1 flex-col items-center gap-2">
      <Button icon="menu" variant="link" class="text-xl" @click="$emit('expand')"></Button>
      <Link to="/" icon="dashboard" :variant="matchRoute('/')"></Link>
      <Button icon="search" variant="link" class="text-xl" @click="$emit('search')"></Button>
      <Link to="/" icon="folder" :variant="matchRoute('/')"></Link>
      <Link to="/" icon="group" :variant="matchRoute('/')"></Link>
      <Link to="/" icon="work" :variant="matchRoute('/')"></Link>
      <Link to="/" icon="savings" :variant="matchRoute('/')"></Link>
      <Link to="/" icon="event" :variant="matchRoute('/')"></Link>
      <Link to="/" icon="build" :variant="matchRoute('/')"></Link>
    </div>

    <div class="flex flex-col items-center gap-2">
      <Link to="/" icon="savings" :variant="matchRoute('/')"></Link>
      <Link to="/" icon="support_agent" :variant="matchRoute('/')"></Link>
      <Button icon="logout" variant="link" class="text-xl" @click="$emit('logout')"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['expand', 'search', 'logout'])

import useMatchRoute from '@/composables/useMatchRoute'

const matchRoute = (route: string) => (useMatchRoute(route) ? 'active' : 'default')
</script>
