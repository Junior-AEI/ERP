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
        <Column field="nomPole" header="nomPole" :sortable="true"> </Column>
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
    <RouterLink to="/addpost">
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
        path: "/posts/${data.id}/update",
        params: {
            nom: data.nom,
            description: data.description,
            nomPole: data.nomPole,
        },
    });
};
let postes = ref([]);

onMounted(() => {
    axios.get("/poste").then((data) => {
        //console.log(data.data);
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
