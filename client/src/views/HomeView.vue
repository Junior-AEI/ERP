<template>
    <Card style="width: 100%; margin: 10px; height: 100%">
        <template #content>
            <div>
                <p v-if="print" class="font-bold">
                    Bienvenue {{ adherent.prenom }} {{ adherent.nom }}
                </p>
                <p v-if="print">Poste actuel : {{ utilisateur.poste }}</p>
            </div>
            <!-- <span>
                <p>Dernière connexion : {{ utilisateur.derniereConnexion }}</p>
            </span> -->
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
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
const utilisateur_id = sessionStorage.getItem("utilisateur_id");
let print = ref(false);

onBeforeMount(async () => {
    await axios
        .get(`/adherent/${adherent_id}`)
        .then((data) => {
            adherent.value.nom = data.data.nom;
            adherent.value.prenom = data.data.prenom;
        })
        .catch((failed: any) =>
            console.log("Probleme avec la requete get adherent:", failed)
        );
    await axios
        .get(`/utilisateur/${utilisateur_id}`)
        .then(async (data) => {
            await axios
                .get(`/poste/${data.data.posteId}`)
                .then((data2) => {
                    utilisateur.value.poste = data2.data.nom;
                })
                .catch((failed: any) =>
                    console.log("Probleme avec la requete get poste:", failed)
                );

            //utilisateur.value.derniereConnexion = data.data.derniereConnexion;
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
