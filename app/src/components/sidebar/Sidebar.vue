<template>
  <div class="flex h-screen border-r bg-primary-foreground text-lg" v-auto-animate>
    <ExpandedSidebar @reduce="reduce()" @search="search()" @logout="logout()" v-if="expanded" />
    <ReducedSidebar @expand="expand()" @search="search()" @logout="logout()" v-else />
  </div>
  <SearchSidebar @close="close()" v-if="displaySearch" v-auto-animate />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(true)
const displaySearch = ref(false)

const expand = () => {
  expanded.value = true
  displaySearch.value = false
}

const reduce = () => {
  expanded.value = false
}

const search = () => {
  displaySearch.value = !displaySearch.value
  reduce()
}

const close = () => {
  displaySearch.value = false
}

const logout = () => {
  alert('logout')
}
</script>
