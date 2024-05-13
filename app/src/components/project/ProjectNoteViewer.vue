<template>
  <div class="flex h-fit flex-1 flex-col gap-3">
    <Card>
      <!-- Compact variant -->
      <CardContent class="flex flex-1 flex-row items-center" v-if="!allnotes">
        <div class="flex h-fit flex-col justify-center">
          <Icon class="text-muted-foreground/70" name="expand_less" @click="next_note" />
          <div class="flex flex-row items-center justify-center gap-0.5">
            <span class="text-xs text-muted-foreground/70">{{ currentNote + 1 }}</span>
            <span class="text-xs text-muted-foreground/70">/</span>
            <span class="text-xs text-muted-foreground/70">{{ projectNotes.length }}</span>
          </div>
          <Icon class="text-muted-foreground/70" name="expand_more" @click="previous_note" />
        </div>
        <div class="ml-2 mr-2 flex flex-1 flex-col gap-1">
          <div class="flex flex-1 gap-1">
            <span class="text-sm text-muted-foreground/80">dernière mise à jour le :</span>
            <span class="text-sm text-muted-foreground/80">{{
              projectNotes[currentNote]?.updatedAt
            }}</span>
          </div>
          <div>
            <span>
              {{ projectNotes[currentNote]?.advancement }} :
              {{ projectNotes[currentNote]?.comment }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-end gap-4">
          <Icon name="edit" />
          <Icon name="delete" v-if="delete_mode" @click="add_to_delete" />
        </div>
      </CardContent>

      <!-- Extended variant -->
      <CardContent class="flex flex-1 flex-col items-center" v-if="allnotes">
        <div
          class="flex h-fit w-full flex-1 justify-between gap-3"
          v-for="note in projectNotes"
          :key="note.noteId"
        >
          <div class="flex flex-row items-center justify-center gap-0.5">
            <span class="text-xs text-muted-foreground/70">{{
              projectNotes.findIndex((projectnote) => {
                projectnote.noteId == note.noteId
              })
            }}</span>
            <span class="text-xs text-muted-foreground/70">/</span>
            <span class="text-xs text-muted-foreground/70">{{ projectNotes.length }}</span>
          </div>

          <div class="ml-2 mr-2 flex flex-1 flex-col gap-1">
            <div class="flex flex-1 gap-1">
              <span class="text-sm text-muted-foreground/80">dernière mise à jour le :</span>
              <span class="text-sm text-muted-foreground/80">{{ note.updatedAt }}</span>
            </div>
            <div>
              <span>{{ note.advancement }} : {{ note.comment }}</span>
            </div>
          </div>
          <div class="flex items-center justify-end gap-4">
            <Icon name="edit" />
            <Icon name="delete" v-if="delete_mode" @click="add_to_delete" />
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="ml-2 mr-2 flex flex-row flex-wrap items-center justify-between gap-2">
      <div class="flex flex-row gap-2">
        <span class="text-sm text-muted-foreground/80" v-if="!allnotes" @click="toggle_all_notes"
          >Afficher toutes les notes</span
        >
        <span class="text-sm text-muted-foreground/80" v-if="allnotes" @click="toggle_all_notes"
          >Cacher toutes les notes</span
        >
      </div>
      <div class="flex flex-row gap-2">
        <span class="text-sm text-muted-foreground/80" @click="add_note">Ajouter une note</span>
        <span
          class="text-sm text-muted-foreground/80"
          v-if="!delete_mode"
          @click="enter_delete_mode"
          >Supprimer des notes</span
        >
        <span class="text-sm text-muted-foreground/80" v-if="delete_mode" @click="exit_delete_mode"
          >Annuler la suppression</span
        >
      </div>
    </div>

    <Card v-if="addnote_mode">
      <CardContent> </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import { type ProjectNotes } from '@/types/api'
import axios from 'axios'

const props = defineProps<{
  projectId: number
}>()

const allnotes = ref<boolean>(false)
const delete_mode = ref<boolean>(false)
const note_to_delete = ref<number[]>([])
const addnote_mode = ref<boolean>(false)

function add_note() {
  addnote_mode.value = true
}

function enter_delete_mode() {
  delete_mode.value = true
}

function add_to_delete(noteId: number) {
  if (note_to_delete.value.includes(noteId)) {
    note_to_delete.value = note_to_delete.value.filter((note) => note !== noteId)
  } else {
    note_to_delete.value.push(noteId)
  }
}

function exit_delete_mode() {
  delete_mode.value = false
}

/* function delete_note() {
  console.log('DELETE')

  // for (const note of note_to_delete) {
  //     axios.delete(`/projectNote/${note}`, {
  //         headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //     })
  // }
} */

function toggle_all_notes() {
  allnotes.value = !allnotes.value
}

function next_note() {
  if (currentNote.value < projectNotes.value.length - 1) {
    currentNote.value++
  }
}
function previous_note() {
  if (currentNote.value > 0) {
    currentNote.value--
  }
}

const currentNote = ref<number>(0)
const projectNotes = ref<ProjectNotes[]>([])

axios
  .get(`/projectNote/byProject/${props.projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((response) => {
    projectNotes.value = [...response.data.data.projectNotes]
    console.log(projectNotes.value)
    console.log(projectNotes.value[currentNote.value])
    currentNote.value = projectNotes.value.length - 1
  })
  .catch((error) => {
    console.log(error)
  })
</script>
