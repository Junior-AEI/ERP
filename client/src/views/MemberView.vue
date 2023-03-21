<template>
    <div class="flex justify-content-center">
        <MemberInfoComponent. :id_user="my_id" />
    </div>
</template>

<script setup lang="ts">
import MemberInfoComponent from "../components/MemberInfoComponent.vue";

const my_id = 1;
</script>

<style scoped lang="scss">
@import "/node_modules/primeflex/primeflex.css";
@media (min-width: 1024px) {
    .user {
        margin: 4em;
    }
}
</style>
