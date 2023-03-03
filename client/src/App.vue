<template>
    <div class="container">
        <div class="grid-left">
            <Sidebar class="sidebar" />
        </div>
        <div class="grid-right">
            <Navbar class="navbar" />
            <div class="main">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>
import { RouterView } from "vue-router";
import Sidebar from "./components/LeftBarComponent.vue";
import Navbar from "./components/TopBarComponent.vue";

export default {
    components: {
        Sidebar,
        Navbar,
    },
};
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
}

body {
    font-family: "Public Sans", sans-serif;
    font-size: 1.2rem;
    min-height: 100%;
}

.container {
    display: grid;
    grid-template-columns: 250px 1fr;

    .grid-right {
        display: grid;
        grid-template-rows: 1fr 10fr;
    }
}
</style>
