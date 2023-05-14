<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <div class="surface-card justify-content-center w-full gap-2">
        <Accordion class="accordion-custom w-full" :activeIndex="0">
            <AccordionTab v-for="doc in documents">
                <template #header>
                    <div
                        class="flex justify-content-between align-items-center w-full"
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
                                :value="getDocumentStatus(doc.versions[0])"
                                :severity="getSeverity(doc.versions[0])"
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
                <Timeline :value="doc.versions">
                    <template #marker="v" class="align-self-center">
                        <Tag
                            :value="v.item.statut"
                            :severity="getSeverity(v.item)"
                            class="w-5rem"
                        />
                    </template>
                    <template #opposite="v" class="p-3">
                        <span>{{
                            new Date(v.item.createdAt).toLocaleString()
                        }}</span>
                    </template>
                    <template #content="v">
                        <div class="flex align-self-center gap-3">
                            <span class="flex align-items-center">{{
                                fileName(doc, v.index)
                            }}</span>
                            <a
                                class="flex align-items-center"
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

const getDocumentStatus = (file: any | undefined) => {
    if (file !== undefined) {
        return file.statut || "À relire";
    } else {
        return "Vide";
    }
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

const getSeverity = (file: any | undefined) => {
    if (file === undefined) {
        return "danger";
    }
    switch (file.statut) {
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

<style>
.p-timeline-event-opposite,
.p-timeline-event-content {
    margin: 0.35rem;
    margin-right: 1.5rem;
    margin-left: 1.5rem;
}
</style>
