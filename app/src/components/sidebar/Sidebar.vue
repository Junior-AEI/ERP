<template>
  <div class="flex h-screen border-r bg-primary-foreground text-lg" v-auto-animate>
    <ReducedSidebar
      @expand="expand()"
      @search="openSearch()"
      @logout="logout()"
      v-if="generalStore.sidebarStatusShrink"
    />
    <ExpandedSidebar @reduce="shrink()" @search="openSearch()" @logout="logout()" v-else />
    <SearchBar @search-close="closeSearch()" @search-open="openSearch()" :open="searchOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useGeneralStore } from '@/stores/generalStore'
import router from '@/router'

const authStore = useAuthStore()

const generalStore = useGeneralStore()

const searchOpen = ref(false)

const expand = () => {
  generalStore.expandSidebar()
}

const shrink = () => {
  generalStore.shrinkSidebar()
}

const closeSearch = () => {
  searchOpen.value = false
}

const openSearch = () => {
  searchOpen.value = true
}

const logout = () => {
  authStore.logout()
  router.push({ path: '/login' })
}
</script>
