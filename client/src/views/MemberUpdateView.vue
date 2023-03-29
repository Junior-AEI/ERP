<template>
    <div class="flex justify-content-center">
        <MemberUpdateComponent :id_user="my_id" />
    </div>
</template>

<script setup lang="ts">
import MemberUpdateComponent from "../components/MemberUpdateComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const my_id = route.params.id;
</script>

<style scoped lang="scss">
@import "/node_modules/primeflex/primeflex.css";
@media (min-width: 1024px) {
    .user {
        margin: 4em;
    }
}
</style>
