<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
<v-app>
    <v-content>
        <RouterView />
    </v-content>
</v-app>
</template>

<style lang="scss">
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
