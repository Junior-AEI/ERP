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
                                <div class="key1">Telephone Mobile</div>
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
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map-marker" />
                                    <InputText
                                        placeholder="Adresse"
                                        class="address_text"
                                        v-model="address"
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
                                <div class="key1">Ville</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map" />
                                    <InputText
                                        placeholder="Ville"
                                        class="city"
                                        v-model="city"
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">Code Postal</div>
                                <span class="p-input-icon-left">
                                    <InputNumber
                                        class="postalCode"
                                        v-model="postalCode"
                                    />
                                </span>
                            </li>

                            <li class="row">
                                <div class="key1">pays</div>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-map" />
                                    <InputMask
                                        placeholder="Pays (FRA)"
                                        class="country"
                                        v-model="country"
                                        mask="aaa"
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
                            <div class="key2">Promotion</div>
                            <span class="p-input-icon-left">
                                <Calendar
                                    v-model="yearDiploma"
                                    view="year"
                                    dateFormat="yy"
                                />
                            </span>
                        </li>
                        <li class="row">
                            <div class="key2">Nationalité</div>
                            <span class="p-input-icon-left">
                                <i class="pi pi-map" />
                                <InputMask
                                    placeholder="Type:FRA"
                                    v-model="nationality"
                                    mask="aaa"
                                />
                            </span>
                        </li>
                        <li class="row">
                            <div class="key2">Filière</div>
                            <Dropdown
                                v-model="selectedField"
                                :options="field"
                                optionLabel="name"
                                placeholder="Filière"
                                class="select"
                            />
                        </li>
                        <li class="row">
                            <div class="key2">moyenPaiement</div>
                            <Dropdown
                                v-model="selectedPayment"
                                :options="payment"
                                optionLabel="name"
                                placeholder="Moyen de paiement"
                                class="select"
                            />
                        </li>
                        <li class="row">
                            <div class="key2">Date de cotisation</div>
                            <span class="p-input-icon-left">
                                <Calendar
                                    class="calendar"
                                    v-model="adhesionDate"
                                    dateFormat="dd/mm/yy"
                                    showIcon
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
                            <div class="key2">Date de Naissance</div>
                            <span class="p-input-icon-left">
                                <Calendar
                                    class="calendar"
                                    v-model="birthDate"
                                    dateFormat="dd/mm/yy"
                                    showIcon
                                />
                            </span>
                        </li>
                        <li class="row">
                            <div class="key2">Lieu de Naissance</div>
                            <span class="p-input-icon-left">
                                <i class="pi pi-compass" />
                                <InputText
                                    placeholder="Lieu de naissance"
                                    v-model="birthPlace"
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
            <Button icon="pi pi-check" label="Valider" @click="addUser()" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

//Useful to create some popup
const confirm1 = useConfirm();
const toast1 = useToast();
const toast2 = useToast();

//Data needed to create an adherent
const lastName = ref();
const firstName = ref();
const selectedGender = ref({ name: "M" });
const gender = ref([{ name: "F" }, { name: "M" }, { name: "O" }]);
const birthDate = ref();
const birthPlace = ref();
const nationality = ref();
const phoneNumber = ref();
const emailAddress = ref();
const address = ref();
const addressComplement = ref(null);
const city = ref();
const postalCode = ref();
const country = ref();
const yearDiploma = ref();
const selectedField = ref();
const field = ref([
    { name: "Info" },
    { name: "Elec" },
    { name: "Matmeca" },
    { name: "Telecom" },
    { name: "R&I" },
    { name: "SEE" },
]);
const adhesionDate = ref();
const selectedPayment = ref();
const payment = ref([
    { name: "Esp" },
    { name: "CB" },
    { name: "Vir" },
    { name: "Lydia" },
]);

//Convert date from calendar of primevue to DATEONLY of sequelize
function convertDateToSpecialFormat(date: any) {
    const timezoneOffsetInMinutes = date.getTimezoneOffset();
    const timezoneOffsetInHours = timezoneOffsetInMinutes / 60;
    const absTimezoneOffsetInHours = Math.abs(timezoneOffsetInHours);
    const hoursOffset = String(Math.floor(absTimezoneOffsetInHours)).padStart(
        2,
        "0"
    );
    const minutesOffset = String(
        Math.floor(
            (absTimezoneOffsetInHours - Math.floor(absTimezoneOffsetInHours)) *
                60
        )
    ).padStart(2, "0");
    const sign = timezoneOffsetInHours > 0 ? "-" : "+";
    const offset = `${sign}${hoursOffset}:${minutesOffset}`;
    const isoString = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date
        .getSeconds()
        .toString()
        .padStart(2, "0")}.${date
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}${offset}`;
    return isoString;
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

// Useful to create a new address and Member
interface Member {
    [key: string]: any;
}
interface Address {
    [key: string]: any;
}

//Function which add an adherent in the data base
// 1. Add an address in the data base
// If some field are empty an error and a popup occur and the address is removed from the base
// 2. If no error, we add a member in the base with the address previously added
// If some fields are incorrect a popup and an error occur
// Else the member is added and the user is redirected in the page with the userTable
function addUser() {
    console.log("Validation ajout adhérent dans la base");

    //Add address of the adherent :
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

                //Add adherent with previous address :
                const newMember: Member = {
                    nom: lastName.value,
                    prenom: firstName.value,
                    sexe: selectedGender.value.name,
                    telephoneMobile: phoneNumber.value,
                    email: emailAddress.value,
                    dateNaissance: convertDateToSpecialFormat(
                        new Date(birthDate.value.toISOString())
                    ),
                    lieuNaissance: birthPlace.value,
                    nationalite: nationality.value,
                    promotion: yearDiploma.value.getFullYear().toString(),
                    dateCotisation: adhesionDate.value.toISOString(),
                    moyenPaiement: selectedPayment.value.name,
                    filiere: selectedField.value.name,
                    adresseId: findIdAddress(allAddress),
                };

                console.log(newMember);

                //Case where there is no problem to add member
                axios
                    .post("/adherent", newMember)
                    .then(function (response) {
                        console.log(response);
                        toast2.add({
                            severity: "info",
                            summary: "Succès",
                            detail: "Utilisateur a été ajouté",
                            life: 3000,
                        });
                        window.location.href = "../users";

                        //Error because some fields are incorrect
                    })
                    .catch(function (error) {
                        console.log("error");
                        confirm1.require({
                            message: "Erreur lors de l'ajout de l'utilisateur",
                            header: "Erreur",
                            icon: "pi pi-info-circle",
                            acceptClass: "p-button-danger",
                            acceptLabel: "Ok",
                            accept: () => {
                                toast1.add({
                                    severity: "info",
                                    summary: "Erreur",
                                    detail: "L'utilisateur n'a pas été ajouté",
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
                message: "Erreur lors de l'ajout de l'utilisateur",
                header: "Erreur",
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                acceptLabel: "Ok",
                accept: () => {
                    toast1.add({
                        severity: "info",
                        summary: "Erreur",
                        detail: "L'utilisateur n'a pas été ajouté",
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
