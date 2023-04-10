<template>
    <Card style="width: 100%; margin: 10px">
        <template #content>
            <div class="flex flex-wrap justify-content-center gap-3">
                <Fieldset class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-user mr-2"></span>
                            <span class="font-bold"
                                >Choix Entreprise</span
                            >
                        </div>
                    </template>
        <!-- <Card id="choiceCompany" style="width: 48%; margin: 10px; float: left;"> -->
            <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <span class="p-input-icon-left">
                    <Listbox v-model="selectedCompany" :options="company" filter optionLabel="nom" class="w-full md:w-14rem" />
                </span>
                            </li>

                            <li class="row">
                                <span class="p-input-icon-left"> 
            <Button icon="pi pi-check" label="Valider" @click="displayCompany" />
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
            <Fieldset class="flex-auto" style="width: 50%; visibility:hidden ;">

            </Fieldset>
    
    <Fieldset id="AddCompany" class="flex-auto">
        <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-user mr-2"></span>
                            <span class="font-bold"
                                >Ajout Entreprise</span
                            >
                        </div>
                    </template>

                    <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <div class="key1">Nom</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText placeholder="Nom" v-model="name" />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Entité juridique</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-user" />
                                    <InputText placeholder="entité" v-model="legalEntity" />
                                </span>
                            </li>

                        </ul>
                    </div>
                </Fieldset>

                <Fieldset id="AddAddress" class="flex-auto">
                    <template #legend>
                        <div class="flex align-items-center">
                            <span class="pi pi-user mr-2"></span>
                            <span class="font-bold"
                                >Adresse</span
                            >
                        </div>
                    </template>

                    <div class="surface-section">
                        <ul class="list-none p-0 m-0">
                            <li class="row">
                                <div class="key1">Adresse</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map-marker" />
                                    <InputText placeholder="Adresse" class="address_text" v-model="address" />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Complément d'adresse</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map-marker" />
                                    <InputText placeholder="Complément d'adresse" class="address_text"
                                        v-model="addressComplement" />
                                </span>
                            </li>
                            <li class="row">
                                <div class="key1">Ville</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map" />
                                    <InputText placeholder="Ville" class="city" v-model="city" />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Code Postal</div>
                                <span class="p-input-icon-left">
                                    <InputNumber class="postalCode" v-model="postalCode" />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">pays</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map" />
                                    <InputMask placeholder="Pays (FRA)" class="country" v-model="country" mask="aaa" />
                                </span>
                            </li>
                        </ul>
                        </div>
                
                </Fieldset>


                </div>
                <div id="AddCompanyButton">
                <Button icon="pi pi-check" label="Ajouter l'entreprise" @click="addCompany" />    
            </div>  
            <div id="AddClient">
                <Button icon="pi pi-check" label="Ajouter un client pour cette entreprise" @click="addClient" />    
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


interface Company  {
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
    console.log(data.data)
    //selectedCompany = data.data[0];      
    // console.log(selectedCompany);
});

function displayCompany(){
    console.log(JSON.stringify(selectedCompany));
    document.cookie = "selectedCompany=" + JSON.stringify(selectedCompany.value) +"; SameSite=None";
    router.push("/addclient");
    

}




function showAddCompany(){
    console.log("show add company");
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
    console.log("Validation ajout entreprise dans la base");


  //  Add address of the adherent :
    const newAddress: Address = {
        adresse: address.value,
        complementAdresse: addressComplement.value,
        ville: city.value,
        codePostal: String(postalCode.value),
        pays: country.value,
    };
    console.log(newAddress);

    axios
        .post("/adresse", newAddress)
        .then(function (response) {
            console.log(response);

            let allAddress = ref([]);

            //Find the address which was previously added
            axios.get("/adresse").then((data) => {
                allAddress = data.data;

                // if fields are empty the address is removed
                if (
                    name.value == undefined ||
                    legalEntity.value == undefined 
                ) {
                    const addr = "/adresse/" + findIdAddress(allAddress);
                    axios.delete(addr);
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

                const newCompany: Company = {
                    nom: name.value,
                    entiteJuridique: legalEntity.value,
                    adresseId: findIdAddress(allAddress),
                };

                console.log(newCompany);

                //Case where there is no problem to add member
                axios
                    .post("/entreprise", newCompany)
                    .then(function (response) {
                        console.log(response);
                        toast2.add({
                            severity: "info",
                            summary: "Succès",
                            detail: "Entreprise a été ajoutée",
                            life: 3000,
                        });
                        console.log(newCompany)
                        document.cookie = "selectedCompany=" + JSON.stringify(newCompany) +"; SameSite=None";
                        document.getElementById("AddClient").style.visibility = "visible";

                        document.getElementById("AddClient").style.height = "auto";
                        
                        //Error because some fields are incorrect
                    })
                    .catch(function (error) {
                        console.log("error");
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
                        const addr = "/adresse/" + findIdAddress(allAddress);
                        axios.delete(addr);
                    });
            });
            //Error because some fields are incorrect
        })
        .catch(function (error) {
            console.log("error");
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
        });
}

function addClient(){
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
#AddAddress, #AddCompany, #AddCompanyButton, #AddClient {

    visibility: hidden;
    height : 0;
}


</style>
