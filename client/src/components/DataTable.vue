<template>


<DataTable :value="users" responsiveLayout="scroll" dataKey="id" v-model:filters="filters" filterDisplay="row" :loading="loading" sortField="Nom" :sortOrder="1" :paginator="true" :rows="10" >
    <Column field="Nom" header="Nom" :sortable="true"> 
        <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" :placeholder="`Nom`"/>
        </template>
    </Column>
    <Column field="Prénom" header="Prénom" :sortable="true">
        <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" :placeholder="`Prénom`"/>
        </template>
    </Column>
    <Column field="Téléphone" header="Téléphone" :sortable="true"></Column>
    <Column field="Email" header="Email" :sortable="true"></Column>
    <Column field="Poste" header="Poste" :sortable="true"></Column>
    <Column field="Promotion" header="Promotion" :sortable="true">
        <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" :placeholder="`Promotion`"/>
        </template>
    </Column>
    <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body>
                    <Button  class="button" icon="pi pi-user-edit"></Button>
                </template>
            </Column>
    
</DataTable>

<Button class="button" label="Ajouter un utilisateur"  @click="handleClick($event)"/>
</template>

<script>
import {FilterMatchMode,FilterOperator} from 'primevue/api';

export default {
    methods : {
    handleClick(){
        console.log("ajout utilisateur");
    },
},
    data() {
        return {
            filters: {
                'Nom': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                'Prénom': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                'Promotion': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
            },
            users: [
                {
                    Nom: "John",
                    Prénom: "bean",
                    Téléphone: "+33 7 45 67 98 26",
                    Email: "john@gmail.com",
                    Poste: "Secrétaire général",
                    Promotion: 2022,
                },
                {
                    Nom: "Lolla",
                    Prénom: "ppp",
                    Téléphone: "+33 7 45 00 98 26",
                    Email: "lolla@gmail.com",
                    Poste: "Chargé qualité",
                    Promotion: 2021,
                },
                {
                    Nom: "david",
                    Prénom: "bbb",
                    Téléphone: "+33 7 00 00 98 26",
                    Email: "david@gmail.com",
                    Poste: "Chargé qualité",
                    Promotion: 2023,
                },
            ],
        };
    },
};
</script>
<style lang="scss" scoped>
 .button {
    float:right;
    background-color: #0C2764;
    border-color: #0C2764;
 };

 .button:hover {
    background-color: #cbd9f9 !important;
    color : black !important;
    transition: 0.7s !important;
  }


</style>