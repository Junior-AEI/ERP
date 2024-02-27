<template>
  <div class="flex flex-col gap-2 py-3">
    <Button icon="menu" variant="link" size="icon" @click="$emit('expand')"></Button>

    <div class="flex w-full flex-1 flex-col items-center gap-2 overflow-scroll px-2 pb-6">
      <Link to="/" icon="dashboard" :variant="matchRoute('/')"></Link>
      <Button icon="search" variant="link" size="icon" @click="$emit('search')"></Button>

      <Link
        :to="route.path"
        :icon="route.meta?.icon"
        :variant="matchRoute(route.path)"
        v-for="route in topRoutes"
        :key="route.path"
      >
      </Link>
      <Link to="/administration" icon="build" :variant="matchRoute('/administration')"></Link>
    </div>
    <div
      class="relative top-0 -mt-8 h-6 w-full bg-gradient-to-b from-primary-foreground/0 to-primary-foreground"
    ></div>

    <div class="flex flex-col items-center gap-2">
      <Link
        :to="route.path"
        :icon="route.meta?.icon"
        :variant="matchRoute(route.path)"
        v-for="route in bottomRoutes"
        :key="route.path"
      >
      </Link>
      <Button icon="logout" variant="link" size="icon" @click="$emit('logout')"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
/* On importe les routes de vue-router */
import { modules } from '@/router'
import type { Route } from '@/types'

const bottomRoutes: Array<Route> = []
const topRoutes: Array<Route> = []

/* On trie les routes par position dans la sidebar */
modules.forEach((route) => {
  if (route.meta?.positionInSidebar !== 'bottom') {
    topRoutes.push(route)
  } else {
    bottomRoutes.push(route)
  }
})

defineEmits(['expand', 'search', 'logout'])

import useMatchRoute from '@/composables/useMatchRoute'

const matchRoute = (route: string) => (useMatchRoute(route) ? 'active' : 'default')
</script>
