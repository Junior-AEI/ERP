<template>
    <div class="container">

    </div>
</template>

<script lang="ts">
export default {
    name: "Navbar.vue",
};
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
$height: 110px;
.container {
    position: fixed;
    background: $dark-blue;
    height: 50px;
    width: 1536px;
}
#userButton{
    justify-content: left;
    background: $dark-blue;
}
</style>
