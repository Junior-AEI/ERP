<template>
    <div class="flex flex-1 flex-col h-fit gap-3">

        <Card>
            <CardContent class="flex flex-1 flex-row items-center">
                <div class="flex flex-col h-fit justify-center">
                    <Icon class="text-muted-foreground/70" name="expand_less"/>
                    <div class="flex flex-row items-center gap-0.5 justify-center">
                        <span class="text-xs text-muted-foreground/70">{{ currentNote }}</span>
                        <span class="text-xs text-muted-foreground/70">/</span>
                        <span class="text-xs text-muted-foreground/70">{{ projectNotes.values.length }}</span>
                    </div>
                    <Icon class="text-muted-foreground/70" name="expand_more"/>
                </div>
                <div class="flex flex-1 flex-col">
                    {{  props.projectId }}
                </div>
                <Icon name="edit" />
            </CardContent>
        </Card>
        
        <div class="flex flex-row flex-wrap gap-2 justify-between items-center mr-2 ml-2">
            <span class="text-sm text-muted-foreground/80">Afficher toutes les notes</span>
            <div class="flex flex-row gap-2">
                <span class="text-sm text-muted-foreground/80">Ajouter une note</span>
                <span class="text-sm text-muted-foreground/80">Supprimer des notes</span>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { defineProps } from 'vue'
import { type ProjectNotes } from '@/types/api'
import axios from 'axios'

let currentNote = ref(new Number(0))

const props = defineProps<{
    projectId: number
}>()

let allnotes:boolean = false




const projectNotes = ref<ProjectNotes[]>([])

axios.get(`/projectNote/byProject/${props.projectId}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
    .then((response) => {
        projectNotes.value = [...response.data.data.projectNote]
    })
    .catch((error) => {
        console.log(error)
    })


</script>