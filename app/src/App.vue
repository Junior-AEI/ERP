<template>
  <Sidebar v-if="logedMode" :class="generalStore.sidebarStatusShrink ? '' : 'w-full sm:w-fit'" />
  <ScrollArea
    class="h-screen flex-1 flex-col"
    :class="generalStore.sidebarStatusShrink ? 'flex' : 'hidden sm:flex'"
  >
    <Titlebar v-if="logedMode" />
    <RouterView class="flex flex-col gap-3 p-6" v-auto-animate />
  </ScrollArea>
  <Toaster />
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { watch, ref, onMounted } from 'vue'

import { useGeneralStore } from '@/stores/generalStore'

const generalStore = useGeneralStore()

onMounted(() => {
  let windowWidth = window.innerWidth
  window.addEventListener('resize', () => {
    if (window.innerWidth < 800 && windowWidth - window.innerWidth > 100) {
      generalStore.shrinkSidebar()
    }
  })
})

const route = useRoute()

const logedMode = ref(false)

watch(route, () => {
  logedMode.value = route.path !== '/login'
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex: 1;
}
</style>
