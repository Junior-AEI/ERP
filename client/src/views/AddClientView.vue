<template>
    <!-- </div> -->
    <Card id="mainPage" style="width: 100%; margin: 10px">
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
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText
                                        placeholder="Nom"
                                        v-model="lastName"
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Prenom</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText
                                        placeholder="Prénom"
                                        v-model="firstName"
                                    />
                                </span>
                            </li>
                            <li class="row">
                                <div class="key1">Genre</div>
                                <Dropdown
                                    v-model="selectedGender"
                                    :options="gender"
                                    optionLabel="name"
                                    placeholder="Genre"
                                    class="select"
                                />
                            </li>

                            <li class="row">
                                <div class="key1">
                                    Fonction dans l'entreprise
                                </div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-sitemap" />
                                    <InputText
                                        placeholder="fonction"
                                        v-model="position"
                                    />
                                </span>
                            </li>
                            <li class="row">
                                <div class="key1">Telephone Fixe</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-phone" />
                                    <InputMask
                                        placeholder="Téléphone"
                                        v-model="phoneNumber"
                                        mask="+99999999999"
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Telephone Mobile</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-mobile" />
                                    <InputMask
                                        placeholder="Téléphone"
                                        v-model="mobilePhone"
                                        mask="+99999999999"
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Email</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-envelope" />
                                    <InputText
                                        placeholder="E-mail"
                                        class="email_text"
                                        v-model="emailAddress"
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>
                </Fieldset>

                <Fieldset id="displayCompany" class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-home mr-2"></span>
                            <span class="font-bold">Entreprise</span>
                        </div>
                    </template>

                    <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <div class="key2">Entreprise</div>
                                <div class="value">
                                    {{ selectedCompany.nom }}
                                </div>
                            </li>
                            <li class="row">
                                <div class="key2">Statut juridique</div>
                                <div class="value">
                                    {{ selectedCompany.entiteJuridique }}
                                </div>
                            </li>
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
        </template>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <template #footer>
            <Button icon="pi pi-check" label="Valider" @click="addClient()" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import router from "@/router";

//Useful to create some popup
const confirm1 = useConfirm();
const toast1 = useToast();
const toast2 = useToast();

function findCookie(nameCookie: string) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name == nameCookie) {
            console.log(value);
            return value;
        }
    }
    return null;
}

let selectedCompany = JSON.parse(findCookie("selectedCompany"));
console.log(selectedCompany);
axios.get("/adresse/" + selectedCompany.adresseId).then((data) => {
    adresse.value = data.data;
    console.log(adresse.value);
});

const lastName = ref();
const firstName = ref();
const selectedGender = ref({ name: "M" });
const gender = ref([{ name: "F" }, { name: "M" }, { name: "O" }]);

const phoneNumber = ref();
const mobilePhone = ref();

const emailAddress = ref();

const position = ref();

interface Address {
    id: string;
    adresse: string;
    complementAdresse: string;
    ville: string;
    codePostal: string;
    pays: string;
    createdAt: string;
    updatedAt: string;
}

interface Client {
    nom: string;
    prenom: string;
    sexe: string;
    telephoneMobile: string;
    telephoneFixe: string;
    email: string;
    fonction: string;
    entrepriseId: string;
}

let adresse = ref({} as Address);

//Find the id of the last company which has been added
function findIdCompany(companies: any, company: any) {
    for (let i = 0; i < companies.length; ++i) {
        if (
            companies[i].nom == company.nom &&
            companies[i].entiteJuridique == company.entiteJuridique &&
            companies[i].adresseId == company.adresseId
        ) {
            return companies[i].id;
        }
    }
}

function addClient() {
    axios.get("/entreprise/").then((data) => {
        let companies = data.data;
        console.log("Ajout client dans la base");

        const newClient: Client = {
            nom: lastName.value,
            prenom: firstName.value,
            sexe: selectedGender.value.name,
            telephoneFixe: phoneNumber.value,
            telephoneMobile: mobilePhone.value,
            email: emailAddress.value,
            fonction: position.value,
            entrepriseId: findIdCompany(companies, selectedCompany),
        };

        axios
            .post("/client", newClient)
            .then(function (response) {
                console.log(response);

                toast2.add({
                    severity: "info",
                    summary: "Succès",
                    detail: "Prospect a été ajouté",
                    life: 3000,
                });
                router.push("/clients");

                //Error because some fields are incorrect
            })
            .catch(function (error) {
                console.log("error");
                confirm1.require({
                    message: "Erreur lors de l'ajout du prospect",
                    header: "Erreur",
                    icon: "pi pi-info-circle",
                    acceptClass: "p-button-danger",
                    acceptLabel: "Ok",
                    accept: () => {
                        toast1.add({
                            severity: "info",
                            summary: "Erreur",
                            detail: "Le prospect n'a pas été ajouté",
                            life: 3000,
                        });
                    },
                });
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

#mainPage {
    visibility: visible;
}

#findCompany {
    visibility: visible;
}
</style>
