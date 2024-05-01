<template>
  <Card class="flex-1">
    <CardHeader>
      <Icon name="user_attributes" class="text-6xl" />
      <span class="text-accent"> Informations du compte utilisateur </span>
    </CardHeader>
    <CardContent>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="userId">Identifiant Utilisateur</Label>
          <Input disabled id="userId" :placeholder="userId" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="username">Nom d'utilisateur</Label>
          <Input id="username" v-model="username" />
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <Label for="emailJE">Email J.E.</Label>
        <Input id="emailJE" v-model="emailJE" />
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="mandateStart">Date de début de mandat</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'justify-start text-left font-normal',
                    !mandateStart && 'text-muted-foreground'
                  )
                "
              >
                <Icon name="date_range" class="mr-2 h-4 w-4" />
                {{
                  mandateStart
                    ? df.format(mandateStart.toDate(getLocalTimeZone()))
                    : 'Choisir une date'
                }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="mandateStart" initial-focus />
            </PopoverContent>
          </Popover>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="lastname">Date de fin de mandat</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn('justify-start text-left font-normal', !mandateEnd && 'text-muted-foreground')
                "
              >
                <Icon name="date_range" class="mr-2 h-4 w-4" />
                {{
                  mandateEnd ? df.format(mandateEnd.toDate(getLocalTimeZone())) : 'Choisir une date'
                }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="mandateEnd" initial-focus />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button @click="editUserData()">Modifier</Button>
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
