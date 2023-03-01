<template>
    <v-app class="grid-container">
        <Navbar class="navbar"/>
        <Sidebar class="sidebar"/>
        <div class="main">
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

.grid-container > * {
  padding: 10px;
  text-align: center;
}

.header {
  grid-area: header;
}

.navbar {
  grid-area: navbar;
  background-color: #0c2764;
}

.sidebar {
  grid-area: sidebar;
  background-color: #0c2764;
}

.main {
  grid-area: main;
}

.grid-container {
  display: grid;
  gap: 10px;
  grid-template:
    "navbar"  50px
    "main"    auto
    "sidebar" 100px
}

@media (min-width: 600px) {
  .grid-container {
    grid-template:
      "navbar  navbar" 50px
      "sidebar main"   auto
      "footer  footer" 100px /
      200px    auto;
  }
}

@media (min-width: 900px) {
  .grid-container {
    grid-template:
      "header  header header"  40px
      "navbar  main   sidebar" auto
      "footer  footer footer"  5px /
      240px    auto   0px;
  }
}
</style>
