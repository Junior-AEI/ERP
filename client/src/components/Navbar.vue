<template>
    <div class="container">
        <Menubar>
            <template #start>
            </template>
            <template #end>
                <Button icon="pi pi-user" class="p-button-rounded p-button-info p-button-text" aria-label="User" />
            </template>
        </Menubar>
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
    background: $dark-blue;
    height: 50px;

    .link {
        color: white;
        padding: 2em;
    }
    .logo {
        position: absolute;
        height: $height;
    }
}
</style>
