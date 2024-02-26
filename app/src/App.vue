<template>
  <Sidebar v-if="logedMode()" />
  <div class="flex h-screen flex-1 flex-col overflow-y-scroll">
    <Titlebar v-if="logedMode()" />
    <RouterView class="flex flex-col p-6" v-auto-animate />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()

const logedMode = () => {
  return route.path !== '/login'
}
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
