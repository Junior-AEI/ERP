<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <DataTable
        :value="postes"
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
        <Column field="description" header="Description" :sortable="true">
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    type="text"
                    v-model="filterModel.value"
                    @keydown.enter="filterCallback()"
                    class="p-column-filter"
                    :placeholder="`Description`"
                />
            </template>
        </Column>
        <Column field="nomPole" header="Pôle" :sortable="true"> </Column>
        <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
        >
            <template #body="{ data }">
                <Button
                    class="button"
                    icon="pi pi-user-edit"
                    @click="editPost(data)"
                ></Button>
            </template>
        </Column>
    </DataTable>
    <RouterLink to="/posts/new">
        <Button id="post-add" class="button" label="Ajouter un poste" />
    </RouterLink>
</template>

<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const filters = ref({
    nom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Pole: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
const editPost = (data: any) => {
    router.push({
        path: "/posts/" + data.id + "/update",
    });
};
let postes = ref([]);

onMounted(() => {
    axios.get("/poste").then((data) => {
        postes.value = data.data;
    });
});
</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";

.button {
    float: right;
}

#post-add {
    margin: 1em 1em 1em 1em;
}
</style>
