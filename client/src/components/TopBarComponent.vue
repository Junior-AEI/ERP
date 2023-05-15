<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <div class="container">
        <Breadcrumb :home="home" :model="itemsBreadcrumb"> </Breadcrumb>

        <Button
            icon="pi pi-user"
            @click="visibleRight = true"
            class="p-button-rounded p-button-info p-button-text"
            aria-label="User"
        />
        <ConfirmDialog></ConfirmDialog>
        <ConfirmDialog group="templating">
            <template #message="slotProps">
                <div class="flex p-4">
                    <i
                        :class="slotProps.message.icon"
                        style="font-size: 1.5rem"
                    ></i>
                    <p class="pl-2">{{ slotProps.message.message }}</p>
                </div>
            </template>
        </ConfirmDialog>
        <ConfirmDialog group="positionDialog"></ConfirmDialog>

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
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import type Breadcrumb from "primevue/breadcrumb";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const confirm = useConfirm();
const toast = useToast();

const visibleRight = ref(false);
const items = [
    {
        label: "Mon profil",
        icon: "pi pi-user-edit",
        command: () => {
            router.push(`/members/${sessionStorage.getItem("adherent_id")}`);
        },
    },
    {
        label: "Se déconnecter",
        icon: "pi pi-sign-out",
        command: () => {
            router.push(`/`);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("utilisateur_id");
            sessionStorage.removeItem("adherent_id");
        },
    },
    {
        label: "Supprimer mon compte",
        icon: "pi pi-fw pi-trash",
        command: () => {
            confirm.require({
                message: "Etes-vous sûr(e) de vouloir supprimer votre compte",
                header: "Suppression du compte",
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                acceptLabel: "Oui",
                rejectLabel: "Non",
                accept: () => {
                    toast.add({
                        severity: "success",
                        summary: "Confirmé",
                        detail: "Compte supprimé",
                        life: 3000,
                    });
                },
                reject: () => {
                    toast.add({
                        severity: "info",
                        summary: "Annulé",
                        detail: "Le compte n'a pas été supprimé",
                        life: 3000,
                    });
                },
            });
        },
    },
];

const home = { icon: "pi pi-home", to: "/home" };
const router = useRouter();
let itemsBreadcrumb = ref([{ label: "Home", to: "/home" }]);
watch(router.currentRoute, (route) => {
    let totalRoute = "/";
    itemsBreadcrumb.value = route.fullPath
        .split("/")
        .filter((item) => item !== "")
        .map((item) => {
            totalRoute += item + "/";
            return {
                label: router.resolve(totalRoute).name,
                to: totalRoute,
            };
        });
});

function shallowMount(
    MyComponent: any,
    arg1: {
        props: { aProp: any };
        global: {
            components: {
                useConfirm: () => {
                    require: (
                        option: import("primevue/confirmationoptions").ConfirmationOptions
                    ) => void;
                    close: () => void;
                };
            };
            plugins: any[];
        };
    }
) {
    throw new Error("Function not implemented.");
}
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
