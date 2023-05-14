<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <Card style="width: 100%; margin: 10px">
        <template #content>
            <div class="flex flex-wrap justify-content-center gap-3">
                <Fieldset class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-user mr-2"></span>
                            <span class="font-bold">Nouveau Poste </span>
                        </div>
                    </template>

                    <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <div class="key1">Nom</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText
                                        placeholder="Nom"
                                        v-model="Pole_Name"
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Description</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText
                                        placeholder="Description"
                                        v-model="Description"
                                    />
                                </span>
                            </li>
                            <li class="row">
                                <div class="key2">Pole</div>
                                <Dropdown
                                    v-model="selectedPole"
                                    :options="pole"
                                    optionLabel="name"
                                    placeholder="Pole"
                                    class="select"
                                />
                            </li>
                        </ul>
                    </div>
                </Fieldset>
            </div>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Valider" @click="addPoste()" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import router from "@/router";
const confirm1 = useConfirm();
const toast = useToast();

//Data needed to create a post
interface Pole {
    nom: string;
}
interface Post {
    [id: string]: any;
}
const Pole_Name = ref();
const Description = ref();
const selectedPole = ref();
const names = [] as Array<any>;
const pole = ref(names);

async function addPoste() {
    // if fields are empty the address is removed
    if (
        Pole_Name.value == undefined ||
        Description.value == undefined ||
        selectedPole.value == undefined
    ) {
        confirm1.require({
            message: "Tous les champs ne sont pas remplis",
            header: "Erreur",
            icon: "pi pi-info-circle",
            acceptClass: "p-button-danger",
            acceptLabel: "Ok",
            accept: () => {
                toast.add({
                    severity: "error",
                    summary: "Erreur",
                    detail: "Champs vides",
                    life: 3000,
                });
            },
        });
    } else {
        //Add post :
        const newPost: Post = {
            nom: Pole_Name.value,
            description: Description.value,
            nomPole: selectedPole.value.name,
        };
        //Case where there is no problem to add member
        await axios
            .post("/poste", newPost)
            .then(() =>
                toast.add({
                    severity: "success",
                    summary: "Succès",
                    detail: "le poste a été ajouté",
                    life: 3000,
                })
            )
            .catch(() =>
                confirm1.require({
                    message: "Erreur lors de l'ajout d'un poste",
                    header: "Erreur",
                    icon: "pi pi-info-circle",
                    acceptClass: "p-button-danger",
                    acceptLabel: "Ok",
                    accept: () => {
                        toast.add({
                            severity: "error",
                            summary: "Erreur",
                            detail: "Le poste n'a pas été ajouté",
                            life: 3000,
                        });
                    },
                })
            )
            .then(() => router.push("/posts"));
    }
}

onMounted(() =>
    axios.get("/pole").then((data) => {
        data.data.forEach((element: any) => {
            names.push({ name: [element.nom][0] });
        });
    })
);
</script>

<style scoped lang="scss">
@import "primeflex/primeflex.scss";

.row {
    @include styleclass(
        "grid align-items-center py-3 px-2 border-top-1 surface-border"
    );
}

.key1 {
    @include styleclass("md:min-w-max col-3 text-500 font-medium");
}

.key2 {
    @include styleclass("md:min-w-max col-2 text-500 font-medium");
}

@media (min-width: 1024px) {
    .client {
        margin: 4em;
    }
}
</style>
