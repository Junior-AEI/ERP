<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <div class="card">
        <FileUpload
            name="demo[]"
            :customUpload="true"
            @uploader="FileUploader"
            :multiple="false"
            accept="application/pdf"
            :maxFileSize="1000000"
        >
            <template
                #header="{
                    chooseCallback,
                    uploadCallback,
                    clearCallback,
                    files,
                }"
            >
                <div
                    class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2"
                >
                    <div class="flex gap-2">
                        <SplitButton
                            @click="chooseCallback()"
                            label="Ajouter"
                            icon="pi pi-file-pdf"
                            :model="STATUTS"
                        >
                        </SplitButton>
                        <Button
                            @click="uploadCallback"
                            label="Uploader"
                            icon="pi pi-cloud-upload"
                            severity="success"
                            :disabled="!files || files.length === 0"
                        ></Button>
                        <Button
                            @click="clearCallback()"
                            label="Supprimer"
                            icon="pi pi-times"
                            severity="danger"
                            :disabled="!files || files.length === 0"
                        ></Button>
                    </div>
                    <div class="flex gap-2">
                        <Tag
                            :value="chosenStatut.label"
                            :severity="chosenStatut.severity"
                        />
                    </div>
                </div>
            </template>
            <template #content="{ files }">
                <div v-if="files.length > 0">
                    <div class="flex flex-wrap p-0 sm:p-5 gap-3">
                        <div
                            class="card m-0 px-3 flex flex-column surface-border align-items-center gap-2"
                        >
                            <div class="p-4">
                                <i
                                    class="pi pi-file-pdf"
                                    style="font-size: 5rem"
                                />
                            </div>
                            <span class="font-semibold">{{
                                files[files.length - 1].name
                            }}</span>
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <div
                    class="flex align-items-center justify-content-center flex-column"
                >
                    <i
                        class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"
                    />
                    <p class="mt-4 mb-0">
                        Glissez-déposez le fichier à téléverser.
                    </p>
                </div>
            </template>
        </FileUpload>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import SplitButton from "primevue/splitbutton";
import Tag from "primevue/tag";
import { useToast } from "primevue/usetoast";
import { ref, onBeforeMount } from "vue";

const toast = useToast();
const props = defineProps<{ docId: Number }>();
const emits = defineEmits<{ (e: "uploadCompleted"): void }>();

let chosenStatut = ref();

const STATUTS = [
    {
        label: "À relire",
        command: () => {
            chosenStatut.value.severity = "warning";
            chosenStatut.value.label = STATUTS[0].label;
        },
    },
    {
        label: "À modifier",
        command: () => {
            chosenStatut.value.severity = "danger";
            chosenStatut.value.label = STATUTS[1].label;
        },
    },
    {
        label: "Validé",
        command: () => {
            chosenStatut.value.severity = "success";
            chosenStatut.value.label = STATUTS[2].label;
        },
    },
    {
        label: "Signé",
        command: () => {
            chosenStatut.value.severity = "info";
            chosenStatut.value.label = STATUTS[3].label;
        },
    },
];

const FileUploader = async (event: { files: File[] }) => {
    const formData = new FormData();
    formData.append("file", event.files[event.files.length - 1]);
    axios
        .post(
            `http://localhost:5000/api/document/${props.docId}/${chosenStatut.value.label}`,
            formData
        )
        .then(() => {
            toast.add({
                severity: "success",
                summary: "Upload successful",
                detail: "File(s) uploaded successfully.",
                life: 3000,
            });
        })
        .then(() => emits("uploadCompleted"))
        .catch(() => {
            toast.add({
                severity: "error",
                summary: "Upload failed",
                detail: "File(s) upload failed.",
                life: 3000,
            });
        });
};

onBeforeMount(() => {
    chosenStatut = ref({ label: STATUTS[0].label, severity: "warning" });
});
</script>
