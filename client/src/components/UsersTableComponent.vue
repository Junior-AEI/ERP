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
