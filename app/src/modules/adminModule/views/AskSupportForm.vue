<template>
  <div>
    <Wrapper>
      <Card class="w-full">
        <CardHeader>
          <Icon name="support_agent" />
          <span class="text-accent">Ticket à la DSI</span>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-2">
            <Label for="title">Titre </Label>
            <Input v-model="form.title" id="title" placeholder="Décrivez brièvement le problème" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="application">Outil concerné</Label>
            <div class="flex flex-row gap-2">
              <Combobox
                @input="handleInput"
                :options="appList"
                :comboboxLabel="'Selectionner l\'outil concernée'"
              ></Combobox>
              <Input
                v-if="form.applicationConcerned === 'Autre (non renseigné)'"
                v-model="otherApplicationConcerned"
                id="title"
                placeholder="Veuillez renseignez l'outil concerné"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <Label for="description">Description</Label>
            <Textarea
              v-model="form.description"
              id="description"
              placeholder="Décrivez précisément le problème"
            />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="file"
              >Ajouter une Capture d'Ecran ou tout document permettant de mieux traiter votre ticket
              <span class="text-secondary-foreground">(facultatif)</span></Label
            >
            <Dropzone v-model="files" :multiple="true" />
          </div>
        </CardContent>

        <CardFooter>
          <Button @click="handleClick">Envoyer ma demande</Button>
        </CardFooter>
      </Card>
    </Wrapper>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { itTicket } from '@/types/api'
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const appList = ref([
  { value: 'ERP', label: 'ERP' },
  { value: 'Passbolt', label: 'Passbolt' },
  { value: 'Wikix', label: 'Wikix' },
  { value: 'Mail', label: 'Mail' },
  { value: 'Autre (non renseigné)', label: 'Autre (renseignez le champ)' }
])

const user = useAuthStore()

const otherApplicationConcerned = ref('')

const form = ref<itTicket>({
  ticketId: NaN,
  userId: user.userId,
  title: '',
  applicationConcerned: '', //Valeur par défaut à MODIFIER
  description: '',
  state: '',
  createdAt: ''
})

const handleInput = (value: string) => {
  form.value.applicationConcerned = value
}
const files = ref<File[]>([])

const { toast } = useToast()

const handleClick = () => {
  if (
    form.value.applicationConcerned === 'Autre (non renseigné)' &&
    otherApplicationConcerned.value != ''
  ) {
    form.value.applicationConcerned = otherApplicationConcerned.value
  }
  // Crée un objet pour envoyer en requête
  axios
    .post(
      `/itTicket/`,
      {
        itTicket: {
          userId: form.value.userId,
          title: form.value.title,
          applicationConcerned: form.value.applicationConcerned,
          description: form.value.description
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      console.log(response)
      toast({
        title: 'Ticket envoyé',
        description: `${form.value.title}`
      })
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
</script>
