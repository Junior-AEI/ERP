<template>
  <div class="flex text-3xl">
    <ExpandedSidebar @reduce="reduce()" @search="search()" v-if="expanded" />
    <ReducedSidebar @expand="expand()" @search="search()" v-else />
    <SearchSidebar @close="close()" v-if="displaySearch" />
  </div>
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
</script>
