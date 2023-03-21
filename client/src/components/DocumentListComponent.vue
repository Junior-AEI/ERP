<template>
    <div class="surface-card justify-content-center w-full gap-2">
        <Accordion class="accordion-custom w-full" :activeIndex="0">
            <AccordionTab v-for="doc in documents">
                <template #header>
                    <div
                        class="flex flex-wrap justify-content-between align-items-center w-full"
                    >
                        <span class="flex flex-wrap button">{{ doc.nom }}</span>
                        <div
                            class="flex flex-wrap justify-content-center align-items-center gap-3"
                        >
                            <Tag
                                :value="doc.status"
                                :severity="getSeverity(doc)"
                            />
                            <Button
                                class="flex flex-wrap button"
                                icon="pi pi-eye"
                            ></Button>
                            <Button
                                @click="preUpload(doc.id)"
                                class="flex flex-wrap button"
                                icon="pi pi-upload"
                            ></Button>
                        </div>
                    </div>
                </template>
                <ul class="list-none" v-for="v in doc.versions">
                    <li
                        class="flex justify-content-between align-items-center py-2 px-1 surface-border flex-wrap"
                    >
                        <span class="flex flex-wrap">{{
                            doc.nom + "_" + v.chemin.slice(-12)
                        }}</span>
                        <span class="flex flex-wrap">{{
                            new Date(v.createdAt).toLocaleString()
                        }}</span>
                    </li>
                </ul>
                <Dialog
                    v-model:visible="displayUpload"
                    modal
                    header="Uploader une nouvelle version"
                    :style="{ width: '50vw' }"
                >
                    <FileUploader :docId="docIdToUpload" />
                </Dialog>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import FileUploader from "../components/FileUploader.vue";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";

import { ref, onMounted } from "vue";
import axios from "axios";

let displayUpload = ref(false);
let docIdToUpload = ref();
const documents = ref();

const preUpload = (docId: number) => {
    displayUpload.value = true;
    docIdToUpload.value = docId;
};

const getTreeTableNodes = () => {
    axios.get("http://localhost:5000/api/document").then((data) => {
        console.log(data.data);
        documents.value = data.data;
    });
};

const getSeverity = (doc: any) => {
    switch (doc.status) {
        case "À relire":
            return "warning";

        case "À modifier":
            return "danger";

        case "Validé":
            return "success";

        case "Signé":
            return "info";

        default:
            return "danger";
    }
};
onMounted(() => {
    getTreeTableNodes();
});
</script>

<style scoped>
.accordion-custom i span {
    vertical-align: middle;
}

.accordion-custom span {
    margin: 0 0.5rem;
}

.p-accordion p {
    line-height: 1.5;
    margin: 0;
}
</style>
