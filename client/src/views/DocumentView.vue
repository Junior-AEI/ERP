<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <div class="flex justify-content-center w-full h-full">
        <div
            class="surface-card p-4 shadow-2 border-round align-self-center w-full h-full"
        >
            <Fieldset legend="Nouveau document" class="p-4 md:max-w-30rem m-4">
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
                            :disabled="docName.length === 0"
                        />
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Liste des documents" class="p-4 m-4">
                <DocumentList ref="docList" />
            </Fieldset>
        </div>
    </div>
</template>

<script setup lang="ts">
import Fieldset from "primevue/fieldset";
import DocumentList from "../components/DocumentListComponent.vue";
import InputText from "primevue/inputtext";

import axios from "axios";
import { ref } from "vue";

let docName = ref("");
const docList = ref(DocumentList);

const createDocument = () => {
    axios
        .post("/document", { nom: docName.value })
        .then(() => docList.value.getTreeTableNodes())
        .then(() => (docName.value = ""));
};
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
    .user {
        margin: 4em;
    }
}
</style>
