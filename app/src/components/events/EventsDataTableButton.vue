<template>
  <div class="col-2">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline" class="" @click="openDialog(item)">
          <span class="material-symbols-outlined"> description </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Description de l'événement</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 px-6 py-4">
          <div class="flex justify-between">
            <p>
              {{ selectedEvent?.description }}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline" class="">
          <span class="material-symbols-outlined"> edit_calendar </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier un événement</DialogTitle>
        </DialogHeader>
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
        <Label>Laisser vide pour laisser inchangé</Label>
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
          <Input disabled id="document" type="file" />
          <Popover v-model:open="isOpenEventType">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                role="combobox"
                :aria-expanded="isOpenEventType"
                class="justify-between"
              >
                {{
                  eventTypeName
                    ? eventTypes.find((eventType) => eventType.value === eventTypeName)?.label
                    : "Sélectionner l'événement"
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="p-0">
              <Command>
                <CommandInput class="h-9" placeholder="Rechercher un événement" />
                <CommandEmpty>Aucun événement trouvé</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      v-for="eventType in eventTypes"
                      :key="eventType.value"
                      :value="eventType.value"
                      @select="
                        (ev) => {
                          if (typeof ev.detail.value === 'string') {
                            eventTypeName = ev.detail.value
                          }
                          isOpenEventType = false
                        }
                      "
                    >
                      {{ eventType.label }}
                      <Check
                        :class="
                          cn(
                            'ml-auto h-4 w-4',
                            eventTypeName === eventType.value ? 'opacity-100' : 'opacity-0'
                          )
                        "
                      />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
                <Checkbox disabled id="bureau" />
                <label> Bureau </label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <DialogFooter>
          <Button @click="deleteEvent()" variant="destructive"> Supprimer l'événement </Button>
          <Button @click="editEvent()" type="submit"> Enregistrer les modifications </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { type DateValue } from '@internationalized/date'
import type { Event } from '@/types/api'
import { Label } from '@/components/ui/label'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

const selectedEvent = ref<Event>()

const props = defineProps<{
  item: Event
}>()

const openDialog = (event: Event) => {
  selectedEvent.value = event
}

const eventInfo = ref<Event>(props.item)

const startDate = ref<DateValue>()
const endDate = ref<DateValue>()

const eventTypeName = ref(eventInfo.value.eventTypeName)

const eventTypes = [
  { value: 'Afterwork', label: 'Afterwork' },
  { value: 'Audit', label: 'Audit' },
  { value: 'Autre', label: 'Autre' },
  { value: 'CA', label: "Conseil d'administration (CA)" },
  { value: 'Congrès', label: 'Congrès' },
  { value: 'Formation', label: 'Formation' },
  { value: 'Réunion', label: 'Réunion' },
  { value: 'RDI', label: "Réunion d'informations (RDI)" },
  { value: 'RDV client', label: 'Rendez-vous client' }
]

const isOpen = ref(false)
const isOpenEventType = ref(false)

const editEvent = () => {
  axios
    .put(
      `/event/${eventInfo.value.eventId}`,
      {
        event: {
          name: eventInfo.value.name,
          startDate: startDate.value?.toString() ?? eventInfo.value.startDate,
          endDate: endDate.value?.toString() ?? eventInfo.value.endDate,
          location: eventInfo.value.location,
          description: eventInfo.value.description,
          eventTypeName: eventTypeName.value ?? eventInfo.value.eventTypeName
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
      location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
}

const deleteEvent = () => {
  axios
    .delete(`/event/${eventInfo.value.eventId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      console.log(response)
      location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
