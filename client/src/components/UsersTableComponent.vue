<template>
    <DataTable
        v-model:selection="selectedUser"
        selectionMode="single"
        :metaKeySelection="false"
        @rowSelect="onRowSelect"
        :value="users"
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
        <Column field="Poste" header="Poste" :sortable="true"></Column>
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
            <template #body>
                <Button class="button" icon="pi pi-user-edit"></Button>
            </template>
        </Column>
    </DataTable>

    <Button
        id="user-add"
        class="button"
        label="Ajouter un utilisateur"
        @click="handleClick()"
    />
</template>

<script setup lang="ts">
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function handleClick() {
    console.log("ajout utilisateur");
    window.location.href = "../adduser";
}

const selectedUser = ref();
const onRowSelect = (event: any) => {
    router.push(`/users/${event.data.id}`);
};

const filters = ref({
    nom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    prenom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    promotion: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
    },
});

let users = ref([]);

onMounted(() => {
    axios.get("/adherent").then((data) => {
        console.log(data.data);
        users.value = data.data;
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
