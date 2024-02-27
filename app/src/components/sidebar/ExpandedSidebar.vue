<template>
  <div class="flex w-full flex-col gap-3 px-6 py-5 sm:w-80">
    <div class="flex w-full justify-between">
      <Link to="/profile" icon="person" :variant="matchRoute('profile')">Hugo Bastien</Link>
      <Button icon="chevron_left" size="icon" variant="link" @click="$emit('reduce')"></Button>
    </div>

    <Input @click="$emit('search')" placeholder="Rechercher" />

    <div class="flex flex-1 flex-col items-start gap-1 overflow-scroll pb-6">
      <Link to="/" icon="dashboard" class="w-full justify-start" :variant="matchRoute('/')">
        Tableau de bord
      </Link>
      <Link
        :to="route.path"
        :icon="route.meta?.icon"
        :variant="matchRoute(route.path)"
        v-for="route in topRoutes"
        :key="route.path"
        class="w-full justify-start"
      >
        {{ route.name }}
      </Link>
      <Link to="/administration" icon="build" :variant="matchRoute('/administration')">
        Administration
      </Link>
    </div>
    <div
      class="relative top-0 -mt-8 h-5 w-full bg-gradient-to-b from-primary-foreground/0 to-primary-foreground"
    ></div>

    <div class="flex flex-col items-start gap-1">
      <Link
        :to="route.path"
        :icon="route.meta?.icon"
        :variant="matchRoute(route.path)"
        v-for="route in bottomRoutes"
        :key="route.path"
        class="w-full justify-start"
      >
        {{ route.name }}
      </Link>
      <Button icon="logout" size="icon" variant="link" class="font-normal" @click="$emit('logout')"
        >Se déconnecter</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['reduce', 'search', 'logout'])

import useMatchRoute from '@/composables/useMatchRoute'

const matchRoute = (route: string) => (useMatchRoute(route) ? 'active' : 'default')

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
</script>
