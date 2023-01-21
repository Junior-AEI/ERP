<template>
    <div class="container">
        <img class="logo" src="../assets/logos/logo-bi-ff.svg" alt="AEI logo" />
        <main>

        </main>
    </div>
</template>

<script lang="ts">
export default {
    name: "Navbar.vue"
};
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
$height: 110px;
.container {
    background: $dark-blue;
    height: $height;

    .logo {
        position: absolute;
        height: $height;
    }
}
</style>