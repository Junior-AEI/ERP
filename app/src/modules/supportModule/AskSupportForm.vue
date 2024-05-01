<template>
  <Wrapper>
    <Card class="w-full">
      <CardHeader>
        <Icon name="support_agent" />
        <span class="text-accent">Ticket à la DSI</span>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-2">
          <Label for="title">{{ titleHint }}</Label>
          <Input v-model="form.title" id="title" placeholder="Décrivez brièvement le problème" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="application">Application concernée</Label>
          <Combobox
            @input="handleInput"
            :options="appList"
            :comboboxLabel="'Selectionner l\'application concernée'"
          ></Combobox>
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
            >Déposer un fichier <span class="text-secondary-foreground">(facultatif)</span></Label
          >
          <Dropzone v-model="file" />
        </div>
      </CardContent>

      <CardFooter>
        <Button @click="handleClick">Envoyer ma demande</Button>
      </CardFooter>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { itTicket } from '@/types/api'
import { ref, computed } from 'vue'
import axios from 'axios'

const appList = ref([
  { value: 'erp', label: 'ERP' },
  { value: 'passbolt', label: 'Passbolt' }
])

const user = useAuthStore()

const form = ref<itTicket>({
  ticketId: NaN,
  userId: user.userId,
  title: '',
  applicationConcerned: '', //Valeur par défaut à MODIFIER
  description: '',
  state: ''
})
const handleInput = (value: string) => {
  form.value.applicationConcerned = value
}
const titleHint = computed(() => {
  // Utilisez une condition pour déterminer le texte en fonction de la valeur de form.title
  if (form.value.applicationConcerned === '') {
    return 'Veuillez saisir un titre'
  } else {
    return 'Titre valide'
  }
})

const file = null

const handleClick = () => {
  // Crée un objet pour envoyer en requête
  axios
    .post(
      `/itTicket/`,
      {
        itTicket: {
          ticketId: form.value.ticketId,
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
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
