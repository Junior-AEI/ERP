<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> calendar_add_on </span>
        <span class="text-accent">Ajouter un événement</span>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid grid-cols-2 gap-2">
          <Label>Nom de l'événement</Label>
          <Label>Emplacement</Label>
          <Input
            id="eventName"
            v-model="eventInfo.name"
            placeholder="Formation Alten : être performant face à un intervenant"
          />
          <Input
            id="location"
            v-model="eventInfo.location"
            placeholder="Où est-ce que ca se passe ?"
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <Label>Date de début </Label>
          <Label>Date de fin</Label>
          <DatePickerComponent v-model="startDate" />
          <DatePickerComponent v-model="endDate" />
        </div>
        <div class="grid gap-2">
          <Label>Description</Label>
          <Textarea
            id="description"
            v-model="eventInfo.description"
            placeholder="Une description très fournie. Elle peut être sur plusieurs lignes."
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <Label for="document">Ajouter une pièce jointe</Label>
          <Label for="eventType">Type d'événement</Label>
          <Input id="document" type="file" />
          <Input
            id="eventType"
            v-model="eventInfo.eventTypeName"
            placeholder="Congrès, Formation..."
          />
        </div>
        <div class="grid gap-4">
          <Collapsible v-model:open="isOpen">
            <CollapsibleTrigger>
              <div class="item-center flex gap-2">
                Notifier certaines personnes
                <span class="material-symbols-outlined"> unfold_more </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div class="flex items-center space-x-2">
                <Checkbox id="bureau" />
                <label> Bureau </label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="administration" />
                <label> Conseil d'administration </label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
      <CardFooter>
        <Button @click="addEvent()" class="w-full"> Ajouter un événement</Button>
      </CardFooter>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { type DateValue } from '@internationalized/date'
import type { Event } from '@/types/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const isOpen = ref(false)

const startDate = ref<DateValue>()
const endDate = ref<DateValue>()

const eventInfo = ref<Event>({
  eventId: NaN,
  name: '',
  startDate: null,
  endDate: null,
  location: '',
  description: '',
  eventTypeName: ''
})

const addEvent = () => {
  axios
    .post(
      `/event/`,
      {
        event: {
          name: eventInfo.value.name,
          startDate: startDate.value?.toString() ?? null,
          endDate: endDate.value?.toString() ?? null,
          location: eventInfo.value.location,
          description: eventInfo.value.description,
          eventTypeName: eventInfo.value.eventTypeName
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
