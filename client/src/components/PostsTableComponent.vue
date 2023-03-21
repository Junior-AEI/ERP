<template>
    <DataTable
        :value="posts"
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
        <Column field="description" header="description" :sortable="true">
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    type="text"
                    v-model="filterModel.value"
                    @keydown.enter="filterCallback()"
                    class="p-column-filter"
                    :placeholder="`description`"
                />
            </template>
        </Column>
        <Column field="Pole" header="Pole" :sortable="true">
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    type="text"
                    v-model="filterModel.value"
                    @keydown.enter="filterCallback()"
                    class="p-column-filter"
                    :placeholder="`Pole`"
                />
            </template>
        </Column>
        <Column field="createdAt" header="createdAt" :sortable="true"></Column>
        <Column field="updatedAt" header="updatedAt" :sortable="true"></Column>
        <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
        >
            <template #body>
                <Button class="button" icon="pi pi-user-edit"></Button>
            </template>
        </Column>
    </DataTable>

    <Button
        id="post-add"
        class="button"
        label="Ajouter un post"
        @click="handleClick()"
    />
</template>

<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { onMounted, ref } from "vue";
import axios from "axios";

function handleClick() {
    console.log("ajout prospect");
}

const filters = ref({
    nom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Pole: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
