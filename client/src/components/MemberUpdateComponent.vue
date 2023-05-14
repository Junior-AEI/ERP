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
                            <span class="font-bold"
                                >Informations personnelles</span
                            >
                        </div>
                    </template>

                    <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Nom</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText
                                        placeholder="Nom"
                                        v-model="lastName"
                                        required
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Prénom</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText
                                        placeholder="Prénom"
                                        v-model="firstName"
                                        required
                                    />
                                </span>
                            </li>
                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Genre</div>
                                <Dropdown
                                    v-model="selectedGender"
                                    :options="gender"
                                    optionLabel="name"
                                    placeholder="Genre"
                                    class="select"
                                    required
                                />
                            </li>

                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Téléphone Mobile</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-phone" />
                                    <InputMask
                                        placeholder="Téléphone"
                                        v-model="phoneNumber"
                                        mask="+99999999999"
                                        required
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Email</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-envelope" />
                                    <InputText
                                        placeholder="E-mail"
                                        class="email_text"
                                        v-model="emailAddress"
                                        required
                                    />
                                </span>
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
                                <div class="req">*</div>
                                <div class="key1">Adresse</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map-marker" />
                                    <InputText
                                        placeholder="Adresse"
                                        class="address_text"
                                        v-model="address"
                                        required
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Complément d'adresse</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map-marker" />
                                    <InputText
                                        placeholder="Complément d'adresse"
                                        class="address_text"
                                        v-model="addressComplement"
                                    />
                                </span>
                            </li>
                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Ville</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map" />
                                    <InputText
                                        placeholder="Ville"
                                        class="city"
                                        v-model="city"
                                        required
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Code Postal</div>
                                <span class="p-input-icon-left">
                                    <InputNumber
                                        class="postalCode"
                                        v-model="postalCode"
                                        required
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Pays</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map" />
                                    <InputMask
                                        placeholder="Pays (FRA)"
                                        class="country"
                                        v-model="country"
                                        mask="aaa"
                                        required
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>
                </Fieldset>
            </div>

            <Fieldset legend="Autres infos">
                <div class="surface-section">
                    <ul class="list-none p-0 m-0">
                        <li class="row">
                            <div class="req">*</div>
                            <div class="key2">Promotion</div>
                            <span class="p-input-icon-left">
                                <Calendar
                                    v-model="yearDiploma"
                                    view="year"
                                    dateFormat="yy"
                                    required
                                />
                            </span>
                        </li>
                        <li class="row">
                            <div class="req">*</div>
                            <div class="key2">Nationalité</div>
                            <span class="p-input-icon-left">
                                <i class="pi pi-map" />
                                <InputMask
                                    placeholder="Type:FRA"
                                    v-model="nationality"
                                    mask="aaa"
                                    required
                                />
                            </span>
                        </li>
                        <li class="row">
                            <div class="req">*</div>
                            <div class="key2">Filière</div>
                            <Dropdown
                                v-model="selectedField"
                                :options="field"
                                optionLabel="name"
                                placeholder="Filière"
                                class="select"
                                required
                            />
                        </li>
                        <li class="row">
                            <div class="req">*</div>
                            <div class="key2">Moyen de paiement</div>
                            <Dropdown
                                v-model="selectedPayment"
                                :options="payment"
                                optionLabel="name"
                                placeholder="Moyen de paiement"
                                class="select"
                                required
                            />
                        </li>
                        <li class="row">
                            <div class="req">*</div>
                            <div class="key2">Date de cotisation</div>
                            <span class="p-input-icon-left">
                                <Calendar
                                    class="calendar"
                                    v-model="adhesionDate"
                                    dateFormat="dd/mm/yy"
                                    showIcon
                                    required
                                />
                            </span>
                        </li>
                    </ul>
                </div>
            </Fieldset>

            <Fieldset legend="Infos confidentielles" :toggleable="true">
                <div class="surface-section">
                    <ul class="list-none p-0 m-0">
                        <li class="row">
                            <div class="req">*</div>
                            <div class="key2">Date de Naissance</div>
                            <span class="p-input-icon-left">
                                <Calendar
                                    class="calendar"
                                    v-model="birthDate"
                                    dateFormat="dd/mm/yy"
                                    showIcon
                                    required
                                />
                            </span>
                        </li>
                        <li class="row">
                            <div class="req">*</div>
                            <div class="key2">Lieu de Naissance</div>
                            <span class="p-input-icon-left">
                                <i class="pi pi-compass" />
                                <InputText
                                    placeholder="Lieu de naissance"
                                    v-model="birthPlace"
                                    required
                                />
                            </span>
                        </li>
                    </ul>
                </div>
            </Fieldset>
        </template>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <template #footer>
            <Button icon="pi pi-check" label="Valider" @click="modifyUser" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { useRouter } from "vue-router";
import validator from "validator";

const confirm = useConfirm();
const toast = useToast();
const router = useRouter();

interface Member {
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
}

interface Address {
    id: string;
    adresse: string;
    complementAdresse: string;
    ville: string;
    codePostal: string;
    pays: string;
}

const props = defineProps({
    id_user: String,
});

let user = ref({} as Member);
let adresse = ref({} as Address);

//Data needed to create an adherent
let lastName = ref();
let firstName = ref();
let selectedGender = ref();
const gender = ref([{ name: "Femme" }, { name: "Homme" }, { name: "Autre" }]);
const convertGenderToLetter: { [key: string]: string } = {
    Femme: "F",
    Homme: "M",
    Autre: "O",
};
const convertLetterToGender: { [key: string]: string } = {
    F: "Femme",
    M: "Homme",
    O: "Autre",
};
let birthDate = ref();
let birthPlace = ref();
let nationality = ref();
let phoneNumber = ref();
let emailAddress = ref();
let address = ref();
let addressComplement = ref();
let city = ref();
let postalCode = ref();
let country = ref();
let yearDiploma = ref();
let selectedField = ref();
let field = ref([
    { name: "Info" },
    { name: "Elec" },
    { name: "Matmeca" },
    { name: "Telecom" },
    { name: "R&I" },
    { name: "SEE" },
]);
let adhesionDate = ref();
let selectedPayment = ref();
let payment = ref([
    { name: "Esp" },
    { name: "CB" },
    { name: "Vir" },
    { name: "Lydia" },
]);

axios
    .get(`/adherent/${props.id_user}`)
    .then((data) => {
        user.value = data.data;
        lastName.value = user.value.nom;
        firstName.value = user.value.prenom;
        selectedGender = ref({ name: convertLetterToGender[user.value.sexe] });
        birthDate.value = new Date(user.value.dateNaissance);
        birthPlace.value = user.value.lieuNaissance;
        nationality.value = user.value.nationalite;
        phoneNumber.value = user.value.telephoneMobile;
        emailAddress.value = user.value.email;
        yearDiploma.value = new Date(user.value.promotion);
        selectedField = ref({ name: user.value.filiere });
        adhesionDate.value = new Date(user.value.dateCotisation);
        selectedPayment = ref({ name: user.value.moyenPaiement });

        return data.data;
    })
    .then(
        (res) => {
            axios.get(`/adresse/${res.adresseId}`).then((data) => {
                adresse.value = data.data;
                address.value = adresse.value.adresse;
                addressComplement.value = adresse.value.complementAdresse;
                city.value = adresse.value.ville;
                postalCode.value = parseInt(
                    adresse.value.codePostal.replace(" ", "")
                );
                country.value = adresse.value.pays;
            });
        },
        (failed: any) =>
            console.log("Probleme avec la requete get adherent:", failed)
    );

function modifyUser() {
    if (
        address.value == undefined ||
        city.value == undefined ||
        postalCode.value == undefined ||
        country.value == undefined
    ) {
        //Address fields are empty
        confirm.require({
            message: "Des champs obligatoires pour l'adresse sont vides",
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
    }

    //Add address of the adherent :
    const updatedAddress: Address = {
        adresse: address.value,
        complementAdresse: addressComplement.value,
        ville: city.value,
        codePostal: String(postalCode.value),
        pays: country.value,
        id: adresse.value.id,
    };

    axios
        .put("/adresse", updatedAddress)
        .then(function (response) {
            let allAddress = ref([]);

            //Find the address which was previously added
            axios.get("/adresse").then((data) => {
                allAddress.value = data.data;

                // if fields are empty the address is removed
                if (
                    lastName.value == undefined ||
                    firstName.value == undefined ||
                    birthDate.value == undefined ||
                    selectedGender.value == undefined ||
                    phoneNumber.value == undefined ||
                    emailAddress.value == undefined ||
                    birthPlace.value == undefined ||
                    nationality.value == undefined ||
                    yearDiploma.value == undefined ||
                    adhesionDate.value == undefined ||
                    selectedPayment.value == undefined ||
                    selectedField.value == undefined
                ) {
                    const addr = "/adresse/" + address.value.id;
                    axios.delete(addr);
                    confirm.require({
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
                }

                //Update adherent with previous address :
                const updatedMember: Member = {
                    id: user.value.id,
                    nom: lastName.value,
                    prenom: firstName.value,
                    sexe: convertGenderToLetter[selectedGender.value.name],
                    telephoneMobile: phoneNumber.value,
                    email: emailAddress.value,
                    dateNaissance: birthDate.value.toISOString(),
                    lieuNaissance: birthPlace.value,
                    nationalite: nationality.value,
                    promotion: yearDiploma.value.getFullYear().toString(),
                    dateCotisation: adhesionDate.value.toISOString(),
                    moyenPaiement: selectedPayment.value.name,
                    filiere: selectedField.value.name,
                    adresseId: adresse.value.id,
                };

                //Case where there is no problem to update member
                axios
                    .put("/adherent", updatedMember)
                    .then(function (response) {
                        confirm.require({
                            message: "Utilisateur modifié avec succès",
                            header: "Succès",
                            icon: "pi pi-info-circle",
                            acceptClass: "pi pi-button-check",
                            acceptLabel: "Ok",
                            accept: () => {
                                router.push(`/members/${user.value.id}`);
                            },
                        });

                        //Error because some fields are incorrect
                    })
                    .catch(function (error) {
                        //phoneNumber is incorrect
                        if (!validator.isMobilePhone(phoneNumber.value)) {
                            confirm.require({
                                message: "Numéro de téléphone incorrect",
                                header: "Erreur",
                                icon: "pi pi-info-circle",
                                acceptClass: "p-button-danger",
                                acceptLabel: "Ok",
                                accept: () => {
                                    toast.add({
                                        severity: "error",
                                        summary: "Erreur",
                                        detail: "Numéro de téléphone incorrect",
                                        life: 3000,
                                    });
                                },
                            });
                        }

                        //emailAdress is incorrect
                        else if (!validator.isEmail(emailAddress.value)) {
                            confirm.require({
                                message: "Adresse Email incorrecte",
                                header: "Erreur",
                                icon: "pi pi-info-circle",
                                acceptClass: "p-button-danger",
                                acceptLabel: "Ok",
                                accept: () => {
                                    toast.add({
                                        severity: "error",
                                        summary: "Erreur",
                                        detail: "Adresse Email incorrecte",
                                        life: 3000,
                                    });
                                },
                            });
                        }

                        //nationality code is incorrect
                        else if (
                            !validator.isISO31661Alpha3(nationality.value)
                        ) {
                            confirm.require({
                                message: "Code Nationalité incorrect",
                                header: "Erreur",
                                icon: "pi pi-info-circle",
                                acceptClass: "p-button-danger",
                                acceptLabel: "Ok",
                                accept: () => {
                                    toast.add({
                                        severity: "error",
                                        summary: "Erreur",
                                        detail: "Code Nationalité incorrect",
                                        life: 3000,
                                    });
                                },
                            });
                        } else {
                            confirm.require({
                                message:
                                    "Erreur lors de la modification de l'utilisateur",
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
                        }
                    });
            });
            //Error because some fields are incorrect
        })
        .catch(function (error) {
            //Country code is incorrect
            if (!validator.isISO31661Alpha3(country.value)) {
                confirm.require({
                    message: "Code Pays incorrect",
                    header: "Erreur",
                    icon: "pi pi-info-circle",
                    acceptClass: "p-button-danger",
                    acceptLabel: "Ok",
                    accept: () => {
                        toast.add({
                            severity: "error",
                            summary: "Erreur",
                            detail: "Code Pays incorrect",
                            life: 3000,
                        });
                    },
                });
            }

            //Postal code is incorrect
            else if (!validator.isPostalCode(String(postalCode.value), "any")) {
                confirm.require({
                    message: "Code Postal incorrect",
                    header: "Erreur",
                    icon: "pi pi-info-circle",
                    acceptClass: "p-button-danger",
                    acceptLabel: "Ok",
                    accept: () => {
                        toast.add({
                            severity: "error",
                            summary: "Erreur",
                            detail: "Code Postal incorrect",
                            life: 3000,
                        });
                    },
                });
            } else {
                //Error in the address not detected previously
                confirm.require({
                    message:
                        "Erreur lors de la modification de l'adresse de l'utilisateur",
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
            }
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

.req {
    color: maroon;
}
</style>
