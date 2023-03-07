<template>
    <div class="container">
        <Breadcrumb :home="home" :model="itemsBreadcrumb"> </Breadcrumb>
        <router-link to="/users">users</router-link>
        <router-link to="/users/1">users/1</router-link>

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
import type Breadcrumb from "primevue/breadcrumb";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

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

const home = { icon: "pi pi-home", to: "/" };
const router = useRouter();
let itemsBreadcrumb = ref([{ label: "Home", to: "/" }]);
watch(router.currentRoute, (route) => {
    let totalRoute = "/";
    itemsBreadcrumb.value = route.fullPath
        .split("/")
        .filter((item) => item !== "")
        .map((item) => {
            totalRoute += item + "/";
            return {
                label: item.charAt(0).toUpperCase() + item.slice(1),
                to: totalRoute,
            };
        });
});
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
$height: 110px;
.container {
    display: flex;
    justify-content: space-between;
    background: $dark-blue;
    height: 50px;

    .p-button-text {
        color: #ffffff !important;
    }
}

Button {
    margin: 0.5em 1em 0.5em 0.5em;
}
</style>
