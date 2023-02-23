<template>
    <v-app>
        <Navbar id="navbar"/>
        <Sidebar id="sidebar"/>
        <div class="view-container">
            <RouterView />
        </div>
    </v-app>
</template>

<script>
    import { RouterView } from "vue-router";
    import Sidebar from "./components/Sidebar.vue";
    import Navbar from "./components/Navbar.vue";

    export default {
        components: {
            Sidebar,
            Navbar,
        }
    }
</script>

<style lang="scss">
    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .view-container {
        width: 79vw;
        padding: 1.5em;
        margin-left: 20vw;
        box-sizing: border-box;
        min-height: 100vh;
    }
</style>
