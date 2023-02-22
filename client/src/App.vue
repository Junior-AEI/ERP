<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
    <v-app>
        <v-content>
            <Navbar />
            <Sidebar />
            <RouterView />
        </v-content>
    </v-app>
</template>

<style lang="scss">
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
