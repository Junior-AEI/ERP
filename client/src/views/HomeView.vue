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
