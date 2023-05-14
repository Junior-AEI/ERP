<template>
    <Card style="width: 100%; margin: 10px; height: 100%">
        <template #content>
            <span class="font-bold">
                <p>Bienvenue {{ adherent.prenom }} {{ adherent.nom }}</p>
            </span>
            <span>
                <p>Poste actuel : {{ utilisateur.poste }}</p>
            </span>
            <!-- <span>
                <p>Dernière connexion : {{ utilisateur.derniereConnexion }}</p>
            </span> -->
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

interface Adherent {
    nom: string;
    prenom: string;
}

interface Utilisateur {
    poste: string;
    //derniereConnexion: Date;
}
let adherent = ref({} as Adherent);
let utilisateur = ref({} as Utilisateur);

const adherent_id = sessionStorage.getItem("adherent_id");

console.log("Test est là : ", adherent_id);
const utilisateur_id = sessionStorage.getItem("utilisateur_id");

onMounted(() => {
    axios
        .get(`/adherent/${adherent_id}`)
        .then((data) => {
            adherent.value.nom = data.data.nom;
            adherent.value.prenom = data.data.prenom;
        })
        .then((failed: any) =>
            console.log("Probleme avec la requete get adherent:", failed)
        );
    axios
        .get(`/utilisateur/${utilisateur_id}`)
        .then((data) => {
            axios
                .get(`/poste/${data.data.posteId}`)
                .then((data2) => {
                    utilisateur.value.poste = data2.data.nom;
                })
                .then((failed: any) =>
                    console.log("Probleme avec la requete get poste:", failed)
                );

            //utilisateur.value.derniereConnexion = data.data.derniereConnexion;
        })
        .then((failed: any) =>
            console.log("Probleme avec la requete get users:", failed)
        );
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
