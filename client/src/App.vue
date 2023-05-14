<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <Toast />
    <div v-if="!$route.meta.loginPage" class="container">
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
    <div v-else>
        <RouterView />
    </div>
</template>

<script lang="ts">
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
@import "./assets/_theme.scss";
@import "/node_modules/primeflex/primeflex.css";

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
    width: 100%;
}

body {
    font-family: "Public Sans", sans-serif;
    font-size: 1.2rem;
    min-height: 100%;
}

.container {
    display: grid;
    grid-template-columns: 250px 1fr;
    height: 100vh;

    .grid-left {
        height: 100%;
    }

    .grid-right {
        display: grid;
        grid-template-rows: auto 10fr;
    }
}
</style>
