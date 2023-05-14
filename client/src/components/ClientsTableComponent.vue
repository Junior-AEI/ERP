<template>
    <DataTable
        :value="clients"
        responsiveLayout="scroll"
        dataKey="id"
        v-model:filters="filters"
        filterDisplay="row"
        sortField="Nom"
        :sortOrder="1"
        :paginator="true"
        :rows="10"
    >
        <Column field="nom" header="Nom" :sortable="true">
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    type="text"
                    v-model="filterModel.value"
                    @keydown.enter="filterCallback()"
                    class="p-column-filter"
                    :placeholder="`Nom`"
                />
            </template>
        </Column>
        <Column field="prenom" header="Prénom" :sortable="true">
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    type="text"
                    v-model="filterModel.value"
                    @keydown.enter="filterCallback()"
                    class="p-column-filter"
                    :placeholder="`Prénom`"
                />
            </template>
        </Column>
        <Column
            field="telephoneMobile"
            header="Téléphone"
            :sortable="true"
        ></Column>
        <Column field="email" header="Email" :sortable="true"></Column>
        <Column field="entreprise" header="Entreprise" :sortable="true">
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    type="text"
                    v-model="filterModel.value"
                    @keydown.enter="filterCallback()"
                    class="p-column-filter"
                    :placeholder="`Entreprise`"
                />
            </template>
        </Column>
        <Column field="fonction" header="Fonction" :sortable="true"></Column>
        <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
        >
            <template #body>
                <Button id="updateClient" class="button" icon="pi pi-user-edit"></Button>
            </template>
        </Column>
    </DataTable>

    <Button
        id="client-add"
        class="button"
        label="Ajouter un prospect"
        @click="handleClick()"
    />
</template>

<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

function handleClick() {
    router.push(`/choosecompany`);
}

const filters = ref({
    nom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    prenom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    entreprise: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
    },
});

let clients = ref([]);

onMounted(() => {
    axios.get("/client").then((data) => {
        // //clients.value = data.data;
        for (let i = 0; i <data.data.length; ++i) {
            axios.get("/entreprise/"+data.data[i].entrepriseId).then((data2) => {
                data.data[i]["entreprise"] = data2.data.nom;

                if (i === data.data.length - 1) {
                    clients.value = data.data;                
                }
            });
        }
            
            
    });

    });

</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";
.button {
    float: right;
}

#client-add {
    margin: 1em 1em 1em 1em;
}

#updateClient {
  pointer-events: none;
  opacity: .65;
}

</style>
