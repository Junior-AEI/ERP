<template>
  <div class="flex w-full flex-col">
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
        <Button variant="outline">
          <span class="material-symbols-outlined"> edit_calendar </span>
        </Button>
      </DialogTrigger>
      <DialogContent class="flex h-fit max-h-[80vh] w-fit flex-col gap-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier un événement</DialogTitle>
        </DialogHeader>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <Label>Nom de l'événement</Label>
            <Input
              id="eventName"
              v-model="eventInfo.name"
              placeholder="Formation Alten : être performant face à un intervenant"
            />
          </div>
          <div class="flex flex-col flex-wrap gap-2">
            <Label>Emplacement</Label>
            <Input
              id="location"
              v-model="eventInfo.location"
              placeholder="Où est-ce que ca se passe ?"
            />
          </div>
          <div class="flex flex-wrap items-end gap-4">
            <div class="md:sm-w-72 flex flex-col gap-2">
              <Label>Période</Label>
              <RangeDatePickerComponent v-model="dateRange" />
            </div>
            <div class="flex gap-4">
              <div class="flex flex-col gap-2">
                <Label>Début</Label>
                <TimeSelector v-model="timeStart" />
              </div>
              <div class="flex flex-col gap-2">
                <Label>Fin</Label>
                <TimeSelector v-model="timeEnd" />
              </div>
            </div>
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
                  <Icon name="unfold_less" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                        <Icon
                          name="check"
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
import { ref, type Ref, computed } from 'vue'
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

import { cn } from '@/lib/utils'
import type { Event } from '@/types/api'

import { type DateRange } from 'radix-vue'
import { CalendarDate, CalendarDateTime } from '@internationalized/date'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { useToast } from '@/components/ui/toast/use-toast'

const selectedEvent = ref<Event>()

const props = defineProps<{
  item: Event
}>()

const openDialog = (event: Event) => {
  selectedEvent.value = event
}

const eventInfo = ref<Event>(props.item)

const today = new Date()
const calendarDateToday = new CalendarDate(
  today.getFullYear(),
  today.getMonth() + 1,
  today.getDate()
)

const dateRange = ref({
  start: calendarDateToday,
  end: calendarDateToday.add({ days: 1 })
}) as Ref<DateRange>

const timeStart = ref({
  hour: '12',
  minute: '00',
  second: '00'
})

const timeEnd = ref({
  hour: '12',
  minute: '00',
  second: '00'
})

const timeSelectionIsValid = computed(() => {
  if (dateRange.value.start === dateRange.value.end) {
    if (timeStart.value.hour > timeEnd.value.hour) {
      return false
    }
  }
  return true
})

const dateStartISO = computed(() => {
  if (!dateRange.value.start) {
    return new CalendarDateTime(
      /* @ts-ignore */
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
      timeStart.value.hour,
      timeStart.value.minute
    ).toString()
  }

  return new CalendarDateTime(
    /* @ts-ignore */
    dateRange.value.start.year,
    dateRange.value.start.month,
    dateRange.value.start.day,
    timeStart.value.hour,
    timeStart.value.minute
  ).toString()
})

const dateEndISO = computed(() => {
  if (!dateRange.value.end) {
    return new CalendarDateTime(
      /* @ts-ignore */
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
      timeEnd.value.hour,
      timeEnd.value.minute
    ).toString()
  }

  return new CalendarDateTime(
    /* @ts-ignore */
    dateRange.value.end.year,
    dateRange.value.end.month,
    dateRange.value.end.day,
    timeEnd.value.hour,
    timeEnd.value.minute
  ).toString()
})

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

const { toast } = useToast()

const editEvent = () => {
  axios
    .put(
      `/event/${eventInfo.value.eventId}`,
      {
        event: {
          name: eventInfo.value.name,
          startDate: dateStartISO.value,
          endDate: dateEndISO.value,
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
      location.reload()
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

const deleteEvent = () => {
  axios
    .delete(`/event/${eventInfo.value.eventId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      location.reload()
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
