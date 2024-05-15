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
      </CardContent>

      <!-- Extended variant -->
      <CardContent class="flex flex-1 flex-col items-center" v-if="allnotes">
        <div class="flex h-fit w-full flex-1 justify-between gap-3" v-for="note in projectNotes" :key="note.noteId">
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
              <span class="text-sm text-muted-foreground/80">{{ convertToCalendarDate(note.updatedAt) }}</span>
            </div>
            <div>
              <span>{{ note.advancement }} : {{ note.comment }}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="ml-2 mr-2 flex flex-row flex-wrap items-center justify-between gap-2">
      <div class="flex flex-row gap-2">
        <span class="text-sm text-muted-foreground/80" v-if="!allnotes" @click="toggle_all_notes">Afficher toutes les
          notes</span>
        <span class="text-sm text-muted-foreground/80" v-if="allnotes" @click="toggle_all_notes">Cacher toutes les
          notes</span>
      </div>
      <div class="flex flex-row gap-2">
        <span class="text-sm text-muted-foreground/80" @click="add_note">Ajouter une note</span>
      </div>
    </div>

    <Card v-if="addnote_mode">
      <CardHeader class="flex justify-between items-center">
        <div class="flex items-center">
          <Icon name="add_circle" class="text-6xl" />
          <span class="text-accent"> Ajouter une tâche </span>
        </div>

        <Button class="ml-5" @click="no_add_note">
          <Icon name="close" class="text-6xl" />
        </Button>

      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-2">
          <Select v-model="form.advancement">
            <SelectTrigger>
              <SelectValue placeholder="Avancement de l'étude" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Prospection">Prospection</SelectItem>
                <SelectItem value="Devis validé">Devis validé</SelectItem>
                <SelectItem value="CE signé">CE signé</SelectItem>
                <SelectItem value="RM signé">RM signé</SelectItem>
                <SelectItem value="FA émise">FA émise</SelectItem>
                <SelectItem value="FA payée">FA payée</SelectItem>
                <SelectItem value="FI émise">FI émise</SelectItem>
                <SelectItem value="FI payée">FI payée</SelectItem>
                <SelectItem value="FS émise">FS émise</SelectItem>
                <SelectItem value="FS payée">FS payée</SelectItem>
                <SelectItem value="PVRF signé">PVRF signé</SelectItem>
                <SelectItem value="PVRI signé">PVRI signé</SelectItem>
                <SelectItem value="ARM signé">ARM signé</SelectItem>
                <SelectItem value="ARCE signé">ARCE signé</SelectItem>
                <SelectItem value="ARRM signé">ARRM signé</SelectItem>
                <SelectItem value="ARCE signé">ARCE signé</SelectItem>
                <SelectItem value="BV payé">BV payé</SelectItem>
                <SelectItem value="Terminé">Terminé</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label>Commentaire</Label>
          <Input type="text" placeholder="Client rapide" v-model="form.comment" />
          <Button variant="outline" @click="AddNote">Ajouter</Button>

        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import { type ProjectNotes } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
const user = useAuthStore()
import { useToast } from '@/components/ui/toast/use-toast'
import {
  CalendarDateTime,
  parseDateTime,
  DateFormatter,
  getLocalTimeZone
} from '@internationalized/date'

const props = defineProps<{
  projectId: number
}>()

const allnotes = ref<boolean>(false)
const addnote_mode = ref<boolean>(false)

const form = ref<ProjectNotes>({
  noteId: NaN,
  projectId: props.projectId,
  writerId: user.userId,
  comment: '',
  advancement: '',
  createdAt: '',
  updatedAt: '',
})

function add_note() {
  addnote_mode.value = true
}
function no_add_note() {
  addnote_mode.value = false
}

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short'
})
function convertToCalendarDate(isoDateString: string): string {
  const dateObject = new Date(isoDateString)

  // Check if the date object is valid
  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid date string')
  }

  // Extract year, month, and day from the date object
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1 // Months are 0-based in JavaScript
  const day = dateObject.getDate()
  const hour = dateObject.getHours()
  const minute = dateObject.getMinutes()

  let date = new CalendarDateTime(year, month, day, hour, minute)

  const dateFormated = df.format(parseDateTime(date.toString()).toDate(getLocalTimeZone()))

  // Create and return a new CalendarDate object
  return dateFormated
}




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
async function getData(){

axios
  .get(`/projectNote/byProject/${props.projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((response) => {
    projectNotes.value = [...response.data.data.projectNotes]
    currentNote.value = projectNotes.value.length - 1
    projectNotes.value.sort((noteA: any, noteB: any) => {
        // Récupérer les dates de fin de chaque projet
        const endDateA = new Date(noteA.createdAt);
        const endDateB = new Date(noteB.createdAt);
        // Calculer les délais en utilisant la fonction delay
        const delayA = delay(endDateA.toISOString());
        const delayB = delay(endDateB.toISOString());
        console.log(delayA)
        // Comparer les délais et retourner le résultat de la comparaison
        return delayA - delayB;
    });
  })
  .catch((error) => {
    console.log(error)
  })

  }
  function delay(isoDateString: string): number {
    const currentDate = new Date().getTime(); // Convertir la date actuelle en timestamp UNIX
    const endDateTime = new Date(isoDateString).getTime();

    // Calcul de la différence en jours
    return endDateTime - currentDate;
}
  

  const { toast } = useToast()


  const AddNote = async () => {
  await axios
    .post(
      `/projectNote`,
      {
        projectNote: {
          projectId: form.value.projectId,
          writerId: form.value.writerId,
          comment: form.value.comment,
          advancement: form.value.advancement,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then(() => {
      
      toast({
        title: 'Événement ajouté',
        description: `La note a bien été ajouté.`

      })
      no_add_note()
      getData()


    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Something wrong happened',
        variant: 'destructive',
        description: `${error.response.data.message}`
      })
    })
}
getData()
</script>
