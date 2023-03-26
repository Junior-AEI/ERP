<template>
    <div class="surface-card justify-content-center w-full gap-2">
        <Accordion class="accordion-custom w-full" :activeIndex="0">
            <AccordionTab v-for="doc in documents">
                <template #header>
                    <div
                        class="flex flex-wrap justify-content-between align-items-center w-full"
                    >
                        <div
                            class="flex flex-wrap justify-content-center align-content-center column-gap-2"
                        >
                            <i class="pi pi-file"></i>
                            <span class="flex flex-wrap button">{{
                                doc.nom
                            }}</span>
                        </div>
                        <div
                            class="flex flex-wrap justify-content-center align-items-center column-gap-2"
                        >
                            <Tag
                                :value="doc.statut"
                                :severity="getSeverity(doc)"
                            />
                            <Button
                                @click="
                                    downloadFile(doc.versions[0].id, doc.nom)
                                "
                                class="flex flex-wrap button"
                                icon="pi pi-download"
                                :disabled="doc.versions.length === 0"
                            ></Button>
                            <Button
                                @click="preUpload(doc.id)"
                                class="flex flex-wrap button"
                                icon="pi pi-cloud-upload"
                            ></Button>
                        </div>
                    </div>
                </template>
                <Timeline
                    :value="doc.versions"
                    class="flex flex-wrap customized-timeline justify-content-center"
                >
                    <template #opposite="v">
                        {{ new Date(v.item.createdAt).toLocaleString() }}
                    </template>
                    <template #content="v">
                        <div class="flex flex-wrap gap-3">
                            <span>{{ fileName(doc, v.index) }}</span>
                            <a
                                @click="
                                    downloadFile(
                                        v.item.id,
                                        fileName(doc, v.index)
                                    )
                                "
                                href="#"
                                ><i
                                    class="pi pi-download"
                                    style="color: darkblue"
                                ></i
                            ></a>
                        </div>
                    </template>
                </Timeline>

                <Dialog
                    v-model:visible="displayUpload"
                    modal
                    header="Uploader une nouvelle version"
                    :style="{ width: '50vw' }"
                >
                    <FileUploader
                        :docId="docIdToUpload"
                        @upload-completed="postUpload()"
                    />
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
import Timeline from "primevue/timeline";

import { ref, onMounted } from "vue";
import axios from "axios";

let displayUpload = ref(false);
let docIdToUpload = ref();
const documents = ref();

const fileName = (doc: any, versionId: number): string => {
    return doc.nom + "_v" + (doc.versions.length - versionId);
};
const preUpload = (docId: number) => {
    displayUpload.value = true;
    docIdToUpload.value = docId;
};
const postUpload = () => {
    displayUpload.value = false;
    getTreeTableNodes();
};

const getTreeTableNodes = () => {
    axios.get("http://localhost:5000/api/document").then((data) => {
        documents.value = data.data;
    });
};

const downloadFile = (fileId: number, filename: string) => {
    axios
        .get(`http://localhost:5000/api/document/file/${fileId}`, {
            responseType: "blob",
        })
        .then((response) => {
            const fileURL = window.URL.createObjectURL(
                new Blob([response.data])
            );
            let fURL = document.createElement("a");

            fURL.href = fileURL;
            fURL.setAttribute("download", filename + ".pdf");

            fURL.click();
        });
};

const getSeverity = (doc: any) => {
    switch (doc.statut) {
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

defineExpose({ getTreeTableNodes });

onMounted(() => {
    getTreeTableNodes();
});
</script>
