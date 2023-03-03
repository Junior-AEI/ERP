<template>
    <div class="container">
        <Button
            icon="pi pi-user"
            @click="visibleRight = true"
            class="p-button-rounded p-button-info p-button-text"
            aria-label="User"
        />
        <Sidebar
            v-model:visible="visibleRight"
            :showCloseIcon="false"
            position="right"
        >
            <PanelMenu :model="items" />
        </Sidebar>
    </div>
</template>

<script setup lang="ts">
import type Button from "primevue/button";
import { ref } from "vue";

const visibleRight = ref(false);
const items = [
    {
        label: "Se déconnecter",
        icon: "pi pi-sign-out",
    },
    {
        label: "Supprimer mon compte",
        icon: "pi pi-fw pi-trash",
        ///@click: delete(),
    },
];
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
$height: 110px;
.container {
    display: flex;
    justify-content: right;
    background: $dark-blue;
    height: 50px;
}

Button {
    margin: 0.5em 1em 0.5em 0.5em;
}
</style>
