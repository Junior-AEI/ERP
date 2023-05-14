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
                            <span class="font-bold">Modifier le Poste </span>
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
                                        v-model="nom"
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Description</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText
                                        placeholder="Description"
                                        v-model="description"
                                    />
                                </span>
                            </li>
                            <li class="row">
                                <div class="key1">Pole</div>
                                <Dropdown
                                    v-model="selectedPole"
                                    :options="pole"
                                    optionLabel="name"
                                    placeholder="pole"
                                    class="select"
                                />
                            </li>
                        </ul>
                    </div>
                </Fieldset>
            </div>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Valider" @click="modifyPost" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { useRouter } from "vue-router";
const confirm = useConfirm();
const toast = useToast();
const router = useRouter();
const props = defineProps({
    post_id: String,
});
interface Post {
    [id: string]: any;
    nom: string;
    description: string;
    nomPole: string;
}
interface pole {
    nom: string;
}

let nom = ref();
let description = ref();
let selectedPole = ref();
let names = [];
let pole = ref(names);

axios.get("/pole").then((data) => {
    data.data.forEach((element) => {
        names.push({ name: [element.nom][0] });
    });
});

axios.get(`/poste/${props.post_id}`).then((data) => {
    nom.value = data.data.nom;
    description.value = data.data.description;
    selectedPole = ref({ name: data.data.nomPole });
});

function modifyPost() {
    const updatedPost: Post = {
        id: props.post_id,
        nom: nom.value,
        description: description.value,
        nomPole: selectedPole.value.name,
    };

    axios
        .put("/poste", updatedPost)
        .then(function (response) {
            confirm.require({
                message: "Poste modifié avec succès",
                header: "Succès",
                icon: "pi pi-info-circle",
                acceptClass: "pi pi-button-check",
                acceptLabel: "Ok",
                accept: () => {
                    router.push("/posts");
                },
            });

            //Error because some fields are incorrect
        })
        .catch(function (error) {
            confirm.require({
                message: "Erreur lors de la modification de l'utilisateur",
                header: "Erreur",
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                acceptLabel: "Ok",
                accept: () => {
                    toast.add({
                        severity: "error",
                        summary: "Erreur",
                        detail: "L'utilisateur n'a pas été modifié",
                        life: 3000,
                    });
                },
            });
        });
}
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

.value {
    @include styleclass("col text-left text-900 w-full");
}
</style>
