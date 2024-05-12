<template>
  <div class="flex w-full flex-col gap-3 px-4 py-3 sm:w-72">
    <div class="flex w-full justify-between">
      <Link to="/profile" icon="person" :variant="matchRoute('/profile')"
        >{{ user.firstName }} {{ user.lastName }}
      </Link>
      <Button
        icon="chevron_left"
        size="icon"
        class="p-0"
        variant="link"
        @click="$emit('reduce')"
      ></Button>
    </div>

    <Button
      icon="search"
      size="icon"
      variant="outline"
      class="w-full justify-start text-sm font-normal text-muted-foreground"
      @click="$emit('search')"
    >
      <span>Rechercher</span>
      <span class="ml-auto text-sm text-muted-foreground">
        <kbd
          class="pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
        >
          <span class="text-xs">Ctrl</span>K
        </kbd>
      </span>
    </Button>

    <ScrollArea class="flex flex-1 flex-col items-start gap-1">
      <Link to="/" icon="dashboard" class="w-full justify-start" :variant="matchRoute('/')">
        Tableau de bord
      </Link>

      <div v-for="route in topRoutes" :key="route.path" class="w-full">
        <Link
          v-if="!route.children"
          :to="route.path"
          :icon="route.meta?.icon"
          :variant="matchRoute(route.path)"
          class="w-full justify-start"
        >
          {{ route.name }}
        </Link>

        <CollapsibleMenu v-else>
          <template v-slot:parent>
            <Link
              :to="route.path"
              :icon="route.meta?.icon"
              :variant="matchRoute(route.path)"
              class="w-full justify-start"
            >
              {{ route.name }}
            </Link>
          </template>
          <template v-slot:children>
            
            <Link 
            v-for="child in route.children.filter((child)=>child.meta?.visible !== false)"
              :to="child.path"
              :icon="child.meta?.icon as IconNames"
              :key="child.path"
              class="p-1 pl-3"
            >
            
              {{ child.name }}

            </Link>
          </template>
        </CollapsibleMenu>
      </div>
    </ScrollArea>

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
import { useAuthStore } from '@/stores/authStore'

const user = useAuthStore()

defineEmits(['reduce', 'search', 'logout'])

import useMatchRoute from '@/composables/useMatchRoute'

const matchRoute = (route: string) => (useMatchRoute(route) ? 'active' : 'default')

import { modules } from '@/router'
import {type IconNames, type Route } from '@/types'

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
