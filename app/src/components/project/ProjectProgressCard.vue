<template>
  <Wrapper>
    <div class="flex flex-1 flex-col gap-2 sm:min-w-72">
      <h2 class="text-accent border-none p-0">Avancement des Etudes en cours</h2>
      <ProjectCard
        v-for="projectNotes in notesActiveProjects"
        :acronym="projectNotes.acronym"
        :advancement="projectNotes.projectNotes.advancement"
        :comment="projectNotes.projectNotes.comment"
        :key="projectNotes.projectNotes.createdAt"
      >
      </ProjectCard>
    </div>
  </Wrapper>
</template>

<script setup lang="ts">
import { type Project, type ProjectNotes } from '@/types/api'
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const activeProjects = ref<Project[]>([
])

interface ProjectNotesWithAcronym {
  acronym: string
  projectNotes: ProjectNotes
}

const notesActiveProjects = ref<ProjectNotesWithAcronym[]>([])

axios
  .get('/project/active', {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  .then((response) => {
    activeProjects.value.push(...response.data.data.projects)

    activeProjects.value.forEach((element) => {
      axios
        .get(`/projectNote/${element.projectId}/lastNote`, {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`
          }
        })
        .then((response) => {
          if (!response.data.data.projectNotes) {
            response.data.data.projectNotes = {
              noteId: 0,
              projectId: element.projectId,
              writerId: 0,
              comment: 'Pas de commentaire',
              advancement: "Pas d'avancement",
              createdAt: new Date().toISOString()
            }
          }
          response.data.data.acronym = element.acronym
          notesActiveProjects.value.push(response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    })

    console.log('activeProjects Notes ooooh :', notesActiveProjects.value)
  })
  .catch((error) => {
    console.log(error)
  })
</script>
