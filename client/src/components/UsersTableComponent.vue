<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <DataTable
        v-model:selection="selectedUser"
        selectionMode="single"
        :metaKeySelection="false"
        @rowSelect="onRowSelect"
        :value="adherents"
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
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback()"
                    class="p-column-filter"
                    placeholder="Search by name"
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
        <Column
            field="utilisateur.poste.nom"
            header="Poste"
            :sortable="true"
        ></Column>
        <Column field="promotion" header="Promotion" :sortable="true">
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    type="text"
                    v-model="filterModel.value"
                    @keydown.enter="filterCallback()"
                    class="p-column-filter"
                    :placeholder="`Promotion`"
                />
            </template>
        </Column>
        <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
        >
            <template #body="{ data }">
                <Button
                    class="button"
                    icon="pi pi-user-edit"
                    @click="editUser(data)"
                ></Button>
            </template>
        </Column>
    </DataTable>

    <Button
        id="user-add"
        class="button"
        label="Ajouter un utilisateur"
        @click="addUser()"
    />
</template>

<script setup lang="ts">
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function addUser() {
    router.push(`/members/new`);
}

const selectedUser = ref();
const onRowSelect = (event: any) => {
    router.push(`/members/${event.data.id}`);
};

const editUser = (data: any) => {
    router.push(`/members/${data.id}/update`);
};

const filters = ref({
    nom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    prenom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    promotion: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
    },
});

let adherents = ref([]);

onMounted(() => {
    axios.get("/adherent").then((data) => {
        adherents.value = data.data;
    });
});
</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";

.button {
    float: right;
}

#user-add {
    margin: 1em 1em 1em 1em;
}
</style>
