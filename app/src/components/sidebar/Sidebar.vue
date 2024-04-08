<template>
  <div class="flex h-screen border-r bg-primary-foreground text-lg" v-auto-animate>
    <ExpandedSidebar @reduce="reduce()" @search="openSearch()" @logout="logout()" v-if="expanded" />
    <ReducedSidebar @expand="expand()" @search="openSearch()" @logout="logout()" v-else />
    <SearchBar @search-close="closeSearch()" @search-open="openSearch()" :open="searchOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const authStore = useAuthStore()

const expanded = ref(true)
const displaySearch = ref(false)
const searchOpen = ref(false)

const expand = () => {
  expanded.value = true
  displaySearch.value = false
}

const reduce = () => {
  expanded.value = false
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
