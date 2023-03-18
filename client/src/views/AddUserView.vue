<template>
    <div class="form">
        <div class="personnalInformationBlock">
            <div class="label">
            <label class="title">Informations personnelles</label>
        </div>
        <div class="personnalInformationInput">
    <div class="card flex flex-wrap justify-content identity">
        <div class="block">
            <p>Nom</p>
        <span class="p-input-icon-left">
            <i class="pi pi-user" />
            <InputText placeholder="Nom" v-model="lastName"/>
            </span>
        </div>
        <div class="block"><p>Prénom</p>
            <span class="p-input-icon-left">
            <i class="pi pi-user" />
            <InputText placeholder="Prénom" v-model="firstName"/>
            </span></div>
            <div class="block">
                <p>Genre</p>
                <Dropdown v-model="selectedGender" :options="gender" optionLabel="name" placeholder="Genre" class="select" />
            </div>
        
            
    </div>
    <div class="card flex flex-wrap justify-content birth">
        <div class="block">
            <p>Date de naissance</p>
        <span class="p-input-icon-left">
            <Calendar class="calendar" v-model="birthDate"  dateFormat="dd/mm/yy" showIcon />
            </span>
        </div>
        <div class="block"><p>Lieu de naissance</p>
            <span class="p-input-icon-left">
            <i class="pi pi-compass" />
            <InputText placeholder="Lieu de naissance" v-model="birthPlace"/>
            </span></div>
            <div class="block">
                <p>Nationalité</p>
                <span class="p-input-icon-left">
            <i class="pi pi-map" />
            <InputText placeholder="Type:FRA" v-model="nationality" />
            </span>
            </div>
        </div>
        <div class="card flex flex-wrap justify-content contact">
        <div class="block">
            <p>Numéro de téléphone</p>
            <span class="p-input-icon-left">
            <i class="pi pi-phone" />
            <InputText placeholder="Téléphone" v-model="phoneNumber"/>
            </span>
        </div>
        <div class="block">
            <p>Adresse mail</p>
            <span class="p-input-icon-left">
            <i class="pi pi-envelope" />
            <InputText placeholder="E-mail" class="email_text" v-model="emailAddress"/>
            </span>
        </div>
       </div>

        </div>
    </div>

    <div class="line"></div>
    <div class="addressBlock">           
        <div class="label">
            <label class="title">Adresse</label>
        </div>
        
        <div class="addressInput">
            <div class="card flex flex-wrap justify-content address">
        <div class="block">
            <p>Adresse</p>
            <span class="p-input-icon-left">
            <i class="pi pi-map-marker" />
            <InputText placeholder="Adresse" class="address_text" v-model="address"/>
            </span>
        </div>
        </div>
        <div class="card flex flex-wrap justify-content complement">
        <div class="block">
            <p>Complément d'adresse</p>
            <span class="p-input-icon-left">
            <i class="pi pi-map-marker" />
            <InputText placeholder="Complément d'adresse" class="address_text" v-model="addressComplement"/>
            </span>
        </div>
        </div>

        <div class="card flex flex-wrap justify-content cityCountry">
        <div class="block blockAddr">
            <p>Ville</p>
            <span class="p-input-icon-left">
            <i class="pi pi-map" />
            <InputText placeholder="Ville" class="city" v-model="city"/>
            </span>
        </div>
        <div class="block blockAddr">
            <p>Code Postal</p>
            <span class="p-input-icon-left">
            <InputNumber  class="postalCode" v-model="postalCode"/>
            </span>
        </div>
        <div class="block blockAddr">
            <p>Pays</p>
            <span class="p-input-icon-left">
            <i class="pi pi-map" />
            <InputText placeholder="Pays (FRA)" class="country" v-model="country"/>
            </span>
        </div>
        </div>
        </div>
        </div>


        <div class="line"></div>
        <div class="studiesBlock">
            <div class="label">
            <label class="title">Etudes</label>
        </div>
        
        <div class="studiesInput">
        <div class="card flex flex-wrap justify-content class">
        <div class="block">
            <p>Promotion</p>
            <span class="p-input-icon-left">
            <Calendar v-model="yearDiploma" view="year" dateFormat="yy" />
            </span>
        </div>
        <div class="block">
            <p>Filière</p>
            <Dropdown v-model="selectedField" :options="field" optionLabel="name" placeholder="Filière" class="select" />
        
        </div>
        </div>
        </div>
        </div>

        <div class="line"></div>
        <div class="adhesionBlock">
            <div class="label">
            <label class="title">Adhésion</label>
        </div>
        
        <div class="adhesionInput">
        <div class="card flex flex-wrap justify-content payment">
        <div class="block">
            <p>Date de cotisation</p>
            <span class="p-input-icon-left">
                <Calendar class="calendar" v-model="adhesionDate" dateFormat="dd/mm/yy" showIcon />
            </span>
        </div>
        <div class="block">
            <p>Moyen de paiement</p>
            <Dropdown v-model="selectedPayment" :options="payment" optionLabel="name" placeholder="Moyen de paiement" class="select" />
        
        </div>
        </div>
        </div>
        <Button
        id="user-add"
        class="button"
        label="Valider"
        @click="addUser()"
    />


        </div>
</div>
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
const selectedGender = ref({name: 'M'});
const gender = ref([
    { name: 'F'},
    { name: 'M'},
    { name: 'O'}
]);
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
    { name: 'Info' },
    { name: 'Elec'},
    { name: 'Matmeca'},
    { name: 'Telecom'},
    { name: 'R&I'},
    { name: 'SEE'}
]);
const adhesionDate = ref();
const selectedPayment = ref();
const payment = ref([
    { name: 'Esp' },
    { name: 'CB'},
    { name: 'Vir'},
    { name: 'Lydia'}
]);


//Convert date from calendar of primevue to DATEONLY of sequelize
function convertDateToSpecialFormat(date : any){
    const timezoneOffsetInMinutes = date.getTimezoneOffset();
    const timezoneOffsetInHours = timezoneOffsetInMinutes / 60;
    const absTimezoneOffsetInHours = Math.abs(timezoneOffsetInHours);
    const hoursOffset = String(Math.floor(absTimezoneOffsetInHours)).padStart(2, '0');
    const minutesOffset = String(Math.floor((absTimezoneOffsetInHours - Math.floor(absTimezoneOffsetInHours)) * 60)).padStart(2, '0');
    const sign = timezoneOffsetInHours > 0 ? '-' : '+';
    const offset = `${sign}${hoursOffset}:${minutesOffset}`;
    const isoString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}${offset}`;
    return isoString;
}

//Find the id of the last address which has been added to link it with an adherent
function findIdAddress(data : any) {
    for (let i =0; i < data.length; ++i) {
        if (data[i].adresse == address.value && data[i].complementAdresse == addressComplement.value
        && data[i].ville == city.value && data[i].codePostal == postalCode.value && data[i].pays == country.value)
        {
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
    console.log("Validation ajout adhérent dans la base")


//Add address of the adherent :
    const newAddress: Address = {
            adresse: address.value,
            complementAdresse: addressComplement.value,
            ville: city.value,
            codePostal: String(postalCode.value),
            pays: country.value,
        };
        console.log(newAddress);

    axios.post("/adresse", newAddress).then(function (response) {
        console.log(response);
  
  
  let allAddress = ref([]);

//Find the address which was previously added
axios.get("/adresse").then((data) =>{
        allAddress = data.data;

        // if fields are empty the address is removed
        if (lastName.value == undefined ||
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
        selectedField.value == undefined )
        {
            const addr = '/adresse/'+ findIdAddress(allAddress);
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
        const newMember : Member = {
            nom: lastName.value,
            prenom: firstName.value,
            sexe: selectedGender.value.name,
            telephoneMobile: phoneNumber.value,
            email: emailAddress.value,
            dateNaissance: convertDateToSpecialFormat(new Date(birthDate.value.toISOString())),
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
    axios.post("/adherent", newMember).then(function (response) {
    console.log(response);
    toast2.add({
            severity: "info",
            summary: "Succès",
            detail: "Utilisateur a été ajouté",
            life: 3000,
            });
    window.location.href='../users';


    //Error because some fields are incorrect
  }).catch(function (error) {

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
            const addr = '/adresse/'+ findIdAddress(allAddress);
            axios.delete(addr);




  });

}) 
//Error because some fields are incorrect
}).catch(function (error) {
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
<style lang="scss" scoped>

@import "../assets/colors.scss";


.identity,.birth, .contact{
    width: 100%;
  margin: 0 .5em;
  padding: .5em;
    


}

.address, .complement {
    margin: 0 .5em;
  padding: .5em;
  min-height: 100%;
}

.cityCountry, .class, .payment {
margin: 0 .5em;
  padding: .5em;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}


.title {
    
    font-size: larger;
    text-decoration-line: underline;  
}
.block {
    margin:0.5em;
    
    
}




.p-input-icon-left, .select {
    margin-top: 2%;
    
    
}



.line{
    margin : 2%;
    padding: 1%;
    background: $light-blue;
    
}

.personnalInformationInput{
    width: 100%;
  padding: 1em;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
}


.address_text {
    width : 60em;
}

.studiesInput, .adhesionInput {
    width: 100%;
  padding: 1em;

}
.addressInput {
    width: 100%;
  padding: 1em;
}



.personnalInformationBlock, .addressBlock, .studiesBlock, .adhesionBlock {
    margin : 1em;
}

.label {
    text-align: center;
}


.button {
    margin :1em;
    width : 15%;
    float: right;
}

</style> -->

