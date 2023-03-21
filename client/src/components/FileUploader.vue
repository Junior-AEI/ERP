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
            <template #empty>
                <div
                    class="flex align-items-center justify-content-center flex-column"
                >
                    <i
                        class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"
                    />
                    <p class="mt-4 mb-0">
                        Glissez-déposez un ou plusieurs fichiers pour les
                        téléverser.
                    </p>
                </div>
            </template>
        </FileUpload>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const props = defineProps<{ docId: Number }>();

const FileUploader = async (event: { files: File[] }) => {
    const formData = new FormData();
    event.files.forEach((file) => {
        formData.append("file", file);
    });
    axios
        .post(`http://localhost:5000/api/document/${props.docId}/`, formData)
        .then(() => {
            toast.add({
                severity: "success",
                summary: "Upload successful",
                detail: "File(s) uploaded successfully.",
                life: 3000,
            });
        })
        .catch(() => {
            toast.add({
                severity: "error",
                summary: "Upload failed",
                detail: "File(s) upload failed.",
                life: 3000,
            });
        });
};
</script>
