<template>
    <div class="flex justify-content-center w-full h-full">
        <div
            class="surface-card p-4 shadow-2 border-round align-self-center w-full h-full"
        >
            <Fieldset legend="Nouveau document" class="w-5 p-4 m-4">
                <div
                    class="flex flex-wrap justify-content-between w-full gap-2"
                >
                    <div class="p-inputgroup flex-1">
                        <InputText
                            id="docName"
                            type="text"
                            placeholder="Nom du document"
                            class="w-full"
                            v-model="docName"
                        />
                        <Button
                            @click="createDocument()"
                            class="flex align-self-right"
                            label="Créer un document"
                        />
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Liste des documents" class="p-4 m-4">
                <DocumentList />
            </Fieldset>
        </div>
    </div>
</template>

<script setup lang="ts">
import Fieldset from "primevue/fieldset";
import DocumentList from "../components/DocumentListComponent.vue";
import InputText from "primevue/inputtext";

import axios from "axios";

let docName: string;
let uploadToggle = true;
const createDocument = () => {
    axios.post("/document", { nom: docName }).then();
};
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
    .user {
        margin: 4em;
    }
}
</style>
