<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
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
                <Button
                    id="updateClient"
                    class="button"
                    icon="pi pi-user-edit"
                ></Button>
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
    router.push(`/clients/new/chooseCompany`);
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
        for (let i = 0; i < data.data.length; ++i) {
            axios
                .get("/entreprise/" + data.data[i].entrepriseId)
                .then((data2) => {
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
    opacity: 0.65;
}
</style>
