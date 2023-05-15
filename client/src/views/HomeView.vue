<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <div class="p-6 text-center md:text-left align-items-center">
        <p class="text-4xl text-primary font-bold mb-3 w-full">
            Bienvenue sur le nouvel ERP d'AEI, {{ prenom }}
        </p>
        <p class="mt-0 mb-4 text-700 line-height-3">
            Nom : {{ nom }}<br />
            Prénom : {{ prenom }}<br />
            Poste actuel : {{ poste }}<br />
        </p>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import axios from "axios";

let prenom = ref();
let nom = ref();
let poste = ref();

const utilisateur_id = sessionStorage.getItem("utilisateur_id");
let print = ref(false);

onBeforeMount(() => {
    axios
        .get(`/utilisateur/${utilisateur_id}`)
        .then((data) => {
            prenom.value = data.data.adherent.prenom;
            nom.value = data.data.adherent.nom;
            poste.value = data.data.poste.nom;
        })
        .catch((failed: any) =>
            console.log("Probleme avec la requete get users:", failed)
        );
    print.value = true;
});
</script>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
