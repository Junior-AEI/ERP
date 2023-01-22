<template>
    <Navbar />
    <UsersList />
</template>

<script setup lang="ts">
    import Navbar from "@/components/Navbar.vue";
    import UsersList from "@/components/UsersList.vue"
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
    .user {
        display:block;
        margin: 4em;
    }
}
</style>