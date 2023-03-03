<template>
    <DataTable />
</template>

<script setup lang="ts">
import DataTable from "../components/UsersTableComponent.vue";
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
    .user {
        margin: 4em;
    }
}
</style>
