<template>
    <div class="flex justify-content-center">
        <PostUpdateComponent :post_id="post_id" />
    </div>
</template>

<script setup lang="ts">
import PostUpdateComponent from "../components/PostUpdateComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const post_id = route.params.id;
</script>

<style scoped lang="scss">
@import "/node_modules/primeflex/primeflex.css";
@media (min-width: 1024px) {
    .user {
        margin: 4em;
    }
}
</style>
