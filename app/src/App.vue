<template>
  <SideBar v-if="showSideBar()" />
  <RouterView class="flex flex-1" />
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()

const showSideBar = () => {
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
