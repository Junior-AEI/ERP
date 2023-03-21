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
                                @click="displayUpload = true"
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
                        <span class="flex flex-wrap">{{ v.chemin }}</span>
                        <span class="flex flex-wrap">{{ v.createdAt }}</span>
                    </li>
                </ul>
            </AccordionTab>
        </Accordion>
    </div>
    <Dialog
        v-model:visible="displayUpload"
        modal
        header="Uploader une nouvelle version"
        :style="{ width: '50vw' }"
    >
        <FileUploader />
    </Dialog>
</template>

<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import FileUploader from "../components/FileUploader.vue";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";

import { ref, onMounted } from "vue";

let displayUpload = ref(false);
const documents = ref();

const getTreeTableNodesData = () => {
    return [
        {
            nom: "Convention d'Étude",
            updatedAt: new Date(),
            status: "Validé",
            versions: [
                {
                    id: 1,
                    chemin: "database/document/CE_v2.pdf",
                    createdAt: "2015-09-17",
                    statut: "En cours",
                },
                {
                    id: 1,
                    chemin: "database/document/CE_v1.pdf",
                    createdAt: "2015-09-13",
                },
            ],
        },
        {
            nom: "Récapitulatif de Mission",
            updatedAt: new Date(),
            status: "À relire",
            versions: [
                {
                    id: 1,
                    chemin: "database/document/RM_V2.pdf",
                    createdAt: "2015-09-13",
                },
                {
                    id: 1,
                    chemin: "database/document/RM_v1.pdf",
                    createdAt: "2015-09-15",
                },
            ],
        },
    ];
};

const getTreeTableNodes = Promise.resolve(getTreeTableNodesData());

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
    getTreeTableNodes.then((doc) => (documents.value = doc));
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
