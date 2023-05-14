<template>
    <Card style="width: 100%; margin: 10px">
        <template #content>
            <div class="flex flex-wrap justify-content-center gap-3">
                <Fieldset class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-user mr-2"></span>
                            <span class="font-bold"
                                >Informations personnelles</span
                            >
                        </div>
                    </template>

                    <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <div class="key1">Nom</div>
                                <div class="value">{{ user.nom }}</div>
                            </li>

                            <li class="row">
                                <div class="key1">Prenom</div>
                                <div class="value">{{ user.prenom }}</div>
                            </li>
                            <li class="row">
                                <div class="key1">Sexe</div>
                                <div class="value">
                                    {{ convertLetterToGender[user.sexe] }}
                                </div>
                            </li>

                            <li class="row">
                                <div class="key1">Telephone Mobile</div>
                                <div class="value">
                                    {{ user.telephoneMobile }}
                                </div>
                            </li>

                            <li class="row">
                                <div class="key1">Email</div>
                                <div class="value">{{ user.email }}</div>
                            </li>
                        </ul>
                    </div>
                </Fieldset>

                <Fieldset class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-home mr-2"></span>
                            <span class="font-bold">Adresse</span>
                        </div>
                    </template>

                    <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <div class="key1">Adresse</div>
                                <div class="value">{{ adresse.adresse }}</div>
                            </li>

                            <li class="row">
                                <div class="key1">Complément d'adresse</div>
                                <div class="value">
                                    {{ adresse.complementAdresse }}
                                </div>
                            </li>
                            <li class="row">
                                <div class="key1">Ville</div>
                                <div class="value">{{ adresse.ville }}</div>
                            </li>

                            <li class="row">
                                <div class="key1">Code Postal</div>
                                <div class="value">
                                    {{ adresse.codePostal }}
                                </div>
                            </li>

                            <li class="row">
                                <div class="key1">pays</div>
                                <div class="value">{{ adresse.pays }}</div>
                            </li>
                        </ul>
                    </div>
                </Fieldset>
            </div>

            <Fieldset legend="Autres infos">
                <div class="surface-section">
                    <ul class="list-none p-0 m-0">
                        <li class="row">
                            <div class="key2">Promotion</div>
                            <div class="value">{{ user.promotion }}</div>
                        </li>
                        <li class="row">
                            <div class="key2">Nationalité</div>
                            <div class="value">{{ user.nationalite }}</div>
                        </li>
                        <li class="row">
                            <div class="key2">Filière</div>
                            <div class="value">{{ user.filiere }}</div>
                        </li>
                        <li class="row">
                            <div class="key2">moyenPaiement</div>
                            <div class="value">{{ user.moyenPaiement }}</div>
                        </li>
                    </ul>
                </div>
            </Fieldset>

            <Fieldset legend="Infos confidentielles" :toggleable="true">
                <div class="surface-section">
                    <ul class="list-none p-0 m-0">
                        <li class="row">
                            <div class="key2">Date de Naissance</div>
                            <div class="value">
                                {{ convertDate(user.dateNaissance) }}
                            </div>
                        </li>
                        <li class="row">
                            <div class="key2">Lieu de Naissance</div>
                            <div class="value">{{ user.lieuNaissance }}</div>
                        </li>
                    </ul>
                </div>
            </Fieldset>

            <Fieldset legend="Poste" v-if="have_poste" :toggleable="true">
                <div class="surface-section">
                    <ul class="list-none p-0 m-0">
                        <li class="row">
                            <div class="key2">Nom du poste</div>
                            <div class="value">{{ poste.nom }}</div>
                        </li>
                        <li class="row">
                            <div class="key2">Description</div>
                            <div class="value">{{ poste.description }}</div>
                        </li>
                    </ul>
                </div>
            </Fieldset>
        </template>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <template #footer>
            <Button icon="pi pi-check" label="Modifier" @click="modifyUser" />
            <Button
                icon="pi pi-times"
                label="Supprimer"
                severity="secondary"
                style="margin-left: 0.5em"
                @click="delUser"
            />
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

const convertLetterToGender: { [key: string]: string } = {
    F: "Femme",
    M: "Homme",
    O: "Autre",
};

interface Adherent {
    id: string;
    nom: string;
    prenom: string;
    sexe: string;
    telephoneMobile: string;
    email: string;
    dateNaissance: string;
    lieuNaissance: string;
    nationalite: string;
    promotion: string;
    dateCotisation: string;
    moyenPaiement: string;
    filiere: string;
    adresseId: string;
    createdAt: string;
    updatedAt: string;
}

interface Adresse {
    id: string;
    adresse: string;
    complementAdresse: string;
    ville: string;
    codePostal: string;
    pays: string;
    createdAt: string;
    updatedAt: string;
}

const props = defineProps({
    id_user: String,
});

let user = ref({} as Adherent);
let adresse = ref({} as Adresse);

onMounted(() => {
    axios
        .get(`/adherent/${props.id_user}`)
        .then((data) => {
            user.value = data.data;
            return data.data;
        })
        .then(
            (res) => {
                axios.get(`/adresse/${res.adresseId}`).then((data) => {
                    adresse.value = data.data;
                });
            },
            (failed: any) =>
                console.log("Probleme avec la requête get adherent:", failed)
        );
});

function modifyUser() {
    router.push(`/members/${user.value.id}/update`);
}

function delUser() {
    confirm.require({
        message: "Es-tu certain de vouloir supprimer cet⋅te adhérent⋅e ?",
        header: "Suppression",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        acceptLabel: "Oui",
        rejectLabel: "Non",
        accept: () => {
            axios
                .delete(`/adherent/${props.id_user}`)
                .then(() => router.push(`/members`))
                .then(() =>
                    toast.add({
                        severity: "success",
                        summary: "Suppression validée",
                        detail: "Adhérent supprimé",
                        life: 3000,
                    })
                )
                .catch(() =>
                    toast.add({
                        severity: "error",
                        summary: "Échec de suppression",
                        detail: "Suppression annulée",
                        life: 3000,
                    })
                );
        },
        reject: () => {},
    });
}

function convertDate(date: string) {
    const d = new Date(date);
    let day;
    let month;
    let year = d.getFullYear().toString();
    if (d == undefined) {
        return date;
    }
    if (d.getDate() < 10) {
        day = "0" + d.getDate();
    } else {
        day = d.getDate().toString();
    }
    if (d.getMonth() < 10) {
        month = "0" + (d.getMonth() + 1);
    } else {
        month = (d.getMonth() + 1).toString();
    }
    return day + "/" + month + "/" + year;
}

// To complete when back is working
const have_poste = false;

const poste = {
    nom: "Comptable",
    description: "Responsable de la comptabilité de la Junior-Entreprise",
};
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
