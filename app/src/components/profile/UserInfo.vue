<template>
  <Card class="h-auto">
    <CardHeader class="flex justify-between items-center">
      <div class="flex items-center">
        <Icon name="user_attributes" class="text-6xl" />
        <span class="text-accent"> Informations du compte utilisateur</span>
      </div>
      <Button class="ml-5" variant="outline" v-if="!canEdit" @click="handleClickModif">Mode Modif</Button>

      <Button class="ml-5" v-if="canEdit" @click="handleClickValidate">Valider les modifications</Button>

    </CardHeader>
    <CardContent>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="username">Nom d'utilisateur</Label>
          <Input :disabled="!canEdit" id="username" v-model="username" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="emailJE">Email J.E.</Label>
          <Input :disabled="!canEdit" id="emailJE" v-model="emailJE" />
        </div>
      </div>

      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="mandateStart">Date de début de mandat</Label>
          <DatePickerComponent :disabled="!canEdit" v-model="mandateStart" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="lastname">Date de fin de mandat</Label>
          <DatePickerComponent :disabled="!canEdit" v-model="mandateEnd" />
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <Label for="userId">Identifiant Utilisateur (Automatique)</Label>
        <Input disabled id="userId" :placeholder="userId" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

import { useToast } from '@/components/ui/toast/use-toast'

import { parseAbsoluteToLocal, type DateValue } from '@internationalized/date'

const editUserData = () => {
  alert('Not Implemented Yet (route not ready)')
}

const props = defineProps<{
  userId: number
}>()

const canEdit = ref(false) // to be edited when permissions are added

const username = ref('')
const mandateStart = ref<DateValue>()
const mandateEnd = ref<DateValue>()
const mandateStartFormat = ref<Date>()

const emailJE = ref('')
const { toast } = useToast()


axios
  .get(`/user/${props.userId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  .then((response) => {
    const user = response.data.data.user
    username.value = user.username
    mandateStart.value = parseAbsoluteToLocal(user.mandateStart)
    mandateEnd.value = parseAbsoluteToLocal(user.mandateEnd)
    emailJE.value = user.emailJE
  })
  .catch((error) => {
    console.error(error)
  })


async function updateUser() {
  const mandateStartISO = mandateStart.value ?
    `${mandateStart.value.year}-${mandateStart.value.month}-${mandateStart.value.day}` : null;
  const mandateEndISO = mandateEnd.value ?
    `${mandateEnd.value.year}-${mandateEnd.value.month}-${mandateEnd.value.day}` : null;

  await axios
    .put(
      `/user/${props.userId}`,
      {
        user: {
          userId: props.userId,
          username: username.value,
          mandateStart: mandateStartISO,
          mandateEnd: mandateEndISO,
          emailJE: emailJE.value,
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
      canEdit.value = false
      toast({
        title: 'Utilisateur modifié',
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


const handleClickValidate = () => {
  updateUser()

}
const handleClickModif = () => {
  canEdit.value = true
}
</script>
