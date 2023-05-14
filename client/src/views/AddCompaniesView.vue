<template>
    <Card style="width: 100%; margin: 10px">
        <template #content>
            <div class="flex flex-wrap justify-content-center gap-3">
                <Fieldset class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-user mr-2"></span>
                            <span class="font-bold">Choix Entreprise</span>
                        </div>
                    </template>
                    <!-- <Card id="choiceCompany" style="width: 48%; margin: 10px; float: left;"> -->
                    <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <span class="p-input-icon-left">
                                    <Listbox
                                        v-model="selectedCompany"
                                        :options="company"
                                        filter
                                        optionLabel="nom"
                                        class="w-full md:w-14rem"
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <span class="p-input-icon-left">
                                    <Button
                                        icon="pi pi-check"
                                        label="Valider"
                                        @click="displayCompany"
                                    />
                                    <Button
                                        icon="pi pi-briefcase"
                                        label="Ajouter une nouvelle entreprise"
                                        severity="secondary"
                                        style="margin-left: 0.5em"
                                        @click="showAddCompany"
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>
                </Fieldset>
                <Fieldset
                    class="flex-auto"
                    style="width: 50%; visibility: hidden"
                >
                </Fieldset>

                <Fieldset id="AddCompany" class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-user mr-2"></span>
                            <span class="font-bold">Ajout Entreprise</span>
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
                                        v-model="name"
                                        required
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="req">*</div>
                                <div class="key1">Entité juridique</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText
                                        placeholder="entité"
                                        v-model="legalEntity"
                                        required
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>
                </Fieldset>

                <Fieldset id="AddAddress" class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-user mr-2"></span>
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
                                <div class="key1">pays</div>
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
            <div id="AddCompanyButton">
                <Button
                    icon="pi pi-check"
                    label="Ajouter l'entreprise"
                    @click="addCompany"
                />
            </div>
            <div id="AddClient">
                <Button
                    icon="pi pi-check"
                    label="Ajouter un client pour cette entreprise"
                    @click="addClient"
                />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import router from "@/router";
import validator from "validator";

const name = ref();
const legalEntity = ref();
const address = ref();
const addressComplement = ref(null);
const city = ref();
const postalCode = ref();
const country = ref();

//Useful to create some popup
const confirm1 = useConfirm();
const toast1 = useToast();
const toast2 = useToast();

interface Company {
    nom: string;
    entiteJuridique: string;
    adresseId: string;
}
interface Address {
    adresse: string;
    complementAdresse: string;
    ville: string;
    codePostal: string;
    pays: string;
}

let company = ref([]);
let selectedCompany = ref({} as Company);

axios.get("/entreprise").then((data) => {
    company.value = data.data;
});

function displayCompany() {
    if (JSON.stringify(selectedCompany.value) !== "{}") {
    document.cookie =
        "selectedCompany=" +
        JSON.stringify(selectedCompany.value) +
        "; SameSite=secure";
    router.push("/addclient");
    }

    else {
        confirm1.require({
                        message: "Aucune entreprise sélectionnée",
                        header: "Erreur",
                        icon: "pi pi-info-circle",
                        acceptClass: "p-button-danger",
                        acceptLabel: "Ok",
                        accept: () => {
                            toast1.add({
                                severity: "info",
                                summary: "Erreur",
                                detail: "Aucune entreprise sélectionnée",
                                life: 3000,
                            });
                        },
                    });
                }
    }


function showAddCompany() {
    document.getElementById("AddCompany").style.visibility = "visible";
    document.getElementById("AddAddress").style.visibility = "visible";
    document.getElementById("AddCompanyButton").style.visibility = "visible";

    document.getElementById("AddCompany").style.height = "auto";
    document.getElementById("AddAddress").style.height = "auto";
    document.getElementById("AddCompanyButton").style.height = "auto";
}

//Find the id of the last address which has been added to link it with an adherent
function findIdAddress(data: any) {
    for (let i = 0; i < data.length; ++i) {
        if (
            data[i].adresse == address.value &&
            data[i].complementAdresse == addressComplement.value &&
            data[i].ville == city.value &&
            data[i].codePostal == postalCode.value &&
            data[i].pays == country.value
        ) {
            return data[i].id;
        }
    }
}

function addCompany() {

    //Address fields are empty
    if (
        address.value == undefined ||
                    city.value == undefined ||
                    postalCode.value == undefined ||
                    country.value == undefined 
                ) {


                    
                    confirm1.require({
                        message: "Des champs obligatoires pour l'adresse sont vides",
                        header: "Erreur",
                        icon: "pi pi-info-circle",
                        acceptClass: "p-button-danger",
                        acceptLabel: "Ok",
                        accept: () => {
                            toast1.add({
                                severity: "info",
                                summary: "Erreur",
                                detail: "Champs vides",
                                life: 3000,
                            });
                        },
                    });
                }


    //  Add address of the adherent :
    const newAddress: Address = {
        adresse: address.value,
        complementAdresse: addressComplement.value,
        ville: city.value,
        codePostal: String(postalCode.value),
        pays: country.value,
    };

    axios
        .post("/adresse", newAddress)
        .then(function (response) {
            let allAddress = ref([]);

            //Find the address which was previously added
            axios.get("/adresse").then((data) => {
                allAddress = data.data;
                
                const newCompany: Company = {
                    nom: name.value,
                    entiteJuridique: legalEntity.value,
                    adresseId: findIdAddress(allAddress),
                };

                //Case where there is no problem to add member
                axios
                    .post("/entreprise", newCompany)
                    .then(function (response) {
                        toast2.add({
                            severity: "info",
                            summary: "Succès",
                            detail: "Entreprise a été ajoutée",
                            life: 3000,
                        });
                        document.cookie =
                            "selectedCompany=" +
                            JSON.stringify(newCompany) +
                            "; SameSite=None";
                        document.getElementById("AddClient").style.visibility =
                            "visible";

                        document.getElementById("AddClient").style.height =
                            "auto";

                        //Error because some fields are incorrect
                    })
                    .catch(function (error) {

                        // if fields are empty the address is removed
                if (name.value == undefined || legalEntity.value == undefined) {
                    confirm1.require({
                        message: "Tous les champs ne sont pas remplis",
                        header: "Erreur",
                        icon: "pi pi-info-circle",
                        acceptClass: "p-button-danger",
                        acceptLabel: "Ok",
                        accept: () => {
                            toast1.add({
                                severity: "info",
                                summary: "Erreur",
                                detail: "Champs vides",
                                life: 3000,
                            });
                        },
                    });
                }
                else {
                        confirm1.require({
                            message: "Erreur lors de l'ajout de l'entreprise",
                            header: "Erreur",
                            icon: "pi pi-info-circle",
                            acceptClass: "p-button-danger",
                            acceptLabel: "Ok",
                            accept: () => {
                                toast1.add({
                                    severity: "info",
                                    summary: "Erreur",
                                    detail: "L'entreprise n'a pas été ajoutée",
                                    life: 3000,
                                });
                            },
                        });
                    }
                        const addr = "/adresse/" + findIdAddress(allAddress);
                        axios.delete(addr);
                    });
                
            });
            //Error because some fields are incorrect
        })
        .catch(function (error) {

            //Country code is incorrect
            if ( ! validator.isISO31661Alpha3(country.value)) {
                    confirm1.require({
                        message: "Code Pays incorrect",
                        header: "Erreur",
                        icon: "pi pi-info-circle",
                        acceptClass: "p-button-danger",
                        acceptLabel: "Ok",
                        accept: () => {
                            toast1.add({
                                severity: "info",
                                summary: "Erreur",
                                detail: "Code Pays incorrect",
                                life: 3000,
                            });
                        },
                    });
                }

                //Postal code is incorrect
            else if ( ! validator.isPostalCode(String(postalCode.value), "any")) {
                confirm1.require({
                        message: "Code Postal incorrect",
                        header: "Erreur",
                        icon: "pi pi-info-circle",
                        acceptClass: "p-button-danger",
                        acceptLabel: "Ok",
                        accept: () => {
                            toast1.add({
                                severity: "info",
                                summary: "Erreur",
                                detail: "Code Postal incorrect",
                                life: 3000,
                            });
                        },
                    });
                }

                else {
            confirm1.require({
                message: "Erreur lors de l'ajout de l'entreprise",
                header: "Erreur",
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                acceptLabel: "Ok",
                accept: () => {
                    toast1.add({
                        severity: "info",
                        summary: "Erreur",
                        detail: "L'entreprise n'a pas été ajoutée",
                        life: 3000,
                    });
                },
            });
        }
        });
}

function addClient() {
    router.push("/addclient");
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
#AddAddress,
#AddCompany,
#AddCompanyButton,
#AddClient {
    visibility: hidden;
    height: 0;
}
.req {
  color:maroon;
}
</style>
