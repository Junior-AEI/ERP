<template>
  <Card class="h-auto">
    <CardHeader>
      <Icon name="user_attributes" class="text-6xl" />
      <span class="text-accent"> Informations du compte utilisateur </span>
    </CardHeader>
    <CardContent>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="userId">Identifiant Utilisateur</Label>
          <Input :disabled="!canEdit" id="userId" :placeholder="userId" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="username">Nom d'utilisateur</Label>
          <Input :disabled="!canEdit" id="username" v-model="username" />
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <Label for="emailJE">Email J.E.</Label>
        <Input :disabled="!canEdit" id="emailJE" v-model="emailJE" />
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
      <Button v-if="canEdit" @click="editUserData()">Modifier</Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'

import {
  DateFormatter,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  type DateValue
} from '@internationalized/date'

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long'
})

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
const emailJE = ref('')

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
</script>
