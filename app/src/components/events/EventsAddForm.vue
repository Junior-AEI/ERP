<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader class="flex justify-between items-center">
        <div class="flex items-center">
          <span class="material-symbols-outlined">calendar_add_on</span>
          <span class="text-accent ml-2">Ajouter un événement</span>
        </div>
        <Button @click="emit('close')">
          <Icon name="close" class="text-6xl" />
        </Button>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex flex-1 flex-wrap items-end gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <Label>Nom de l'événement</Label>
            <Input id="eventName" v-model="eventInfo.name"
              placeholder="Formation : Apprendre à utiliser le nouvel ERP" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label>Emplacement</Label>
            <Input id="location" v-model="eventInfo.location" placeholder="Grand local" />
          </div>
        </div>
        <div class="flex flex-wrap items-end gap-4">
          <div class="md:sm-w-72 flex flex-col gap-2">
            <Label>Période</Label>
            <RangeDatePickerComponent v-model="dateRange" />
          </div>
          <div class="flex flex-wrap gap-4">
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
        <p v-if="!timeSelectionIsValid" class="text-sm text-red-500" role="alert" aria-live="assertive">
          L'heure de fin doit être après l'heure de début
        </p>

        <div class="flex flex-col gap-4">
          <Label>Description</Label>
          <Textarea id="description" v-model="eventInfo.description"
            placeholder="Une description très fournie. Elle peut être sur plusieurs lignes." />
        </div>
        <div class="flex max-w-full flex-1 flex-col gap-2">
          <Label for="eventType">Type d'événement</Label>
          <Popover v-model:open="isOpenEventType">
            <PopoverTrigger as-child>
              <Button variant="outline" role="combobox" :aria-expanded="isOpenEventType"
                class="justify-between text-clip">
                <span class="truncate">
                  {{
                    eventTypeName
                      ? eventTypes.find((eventType) => eventType.value === eventTypeName)?.label
                      : "Sélectionner le type d'événement"
                  }}
                </span>
                <Icon name="unfold_more" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="p-0">
              <Command>
                <CommandInput class="h-9" placeholder="Rechercher un événement" />
                <CommandEmpty>Aucun événement trouvé</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    <CommandItem v-for="eventType in eventTypes" :key="eventType.value" :value="eventType.value"
                      @select="(ev) => {
                        if (typeof ev.detail.value === 'string') {
                          eventTypeName = ev.detail.value
                        }
                        isOpenEventType = false
                      }
                        ">
                      {{ eventType.label }}
                      <Icon name="check" :class="cn(
                        'ml-auto h-4 w-4',
                        eventTypeName === eventType.value ? 'opacity-100' : 'opacity-0'
                      )
                        " />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="document">Ajouter une pièce jointe</Label>
            <Dropzone v-model="files" :multiple="true" />
          </div>

        </div>
        <!-- <div class="flex items-end gap-4">
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
        </div> -->
      </CardContent>
      <CardFooter>
        <Button @click="handleClick()" class="w-full"> Ajouter un événement</Button>
      </CardFooter>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import type { Event, EventDoc, DocumentType } from '@/types/api'

import { ref, type Ref, computed, onMounted } from 'vue'

import { cn } from '@/lib/utils'

import { CalendarDate, CalendarDateTime } from '@internationalized/date'
import { type DateRange } from 'radix-vue'

import { useToast } from '@/components/ui/toast/use-toast'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

const emit = defineEmits(['add:event', 'close'])

const isOpenEventType = ref(false)

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

const eventTypeName = ref('')

const { toast } = useToast()

const eventInfo = ref<Event>({
  eventId: NaN,
  name: '',
  startDate: '',
  endDate: '',
  location: '',
  description: '',
  eventTypeName: ''
})

const files = ref<File[]>([])
const documentTypes = ref<DocumentType[]>([])


const addEvent = async () => {
  await axios
    .post(
      `/event`,
      {
        event: {
          name: eventInfo.value.name,
          startDate: dateStartISO.value,
          endDate: dateEndISO.value,
          location: eventInfo.value.location,
          description: eventInfo.value.description,
          eventTypeName: eventTypeName.value
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      emit('add:event', [])
      documentInfos.value.eventId = response.data.data.eventId
      
      toast({
        title: 'Événement ajouté',
        description: `L'événement ${eventInfo.value.name} a bien été ajouté.`
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
const removeExtension = (filename: string): string => {
  return filename.split('.').slice(0, -1).join('.')
}

const user = useAuthStore()

const documentInfos = ref<EventDoc>({
  documentId: NaN,
  name: '',
  path: '',
  version: 1,
  typeId: NaN,
  information: '',
  status: 'Sans Relecture',
  authorId: user.userId,
  createdAt: '',
  eventId: NaN,
})

async function getDocumentType(): Promise<DocumentType[]> {
  const response = await axios.get(`/documentType`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return response.data.data.documentTypes
}

const uploadDocument = (i : number) => {

  console.log(documentInfos.value.eventId)

  axios
    .post(
      `/document`,
      {
        document: {
          name: removeExtension(files.value[i].name),
          version: documentInfos.value.version,
          typeId:
            documentTypes.value.find(
              (documentType: any) => documentType.type === "Doc lié à un événement"
            )?.typeId ?? 0, // should not be equal to 0
          information: documentInfos.value.eventId.toString(),
          status: documentInfos.value.status,
          authorId: documentInfos.value.authorId,
        },
        file: files.value[i]
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then(() => {
      toast({
        title: 'Document envoyé',
        description: `Le document a été envoyé avec succès.`
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
onMounted(async () => {
  documentTypes.value = await getDocumentType()
})


async function handleClick() {
  await addEvent()
  if (files.value) {
    for (let i = 0; i < files.value.length; i++) { 
      await uploadDocument(i)
    }
    
  }
  clearFields()
}

const clearFields = () => {
  eventInfo.value.eventId = NaN,
    eventInfo.value.name = '',
    eventInfo.value.startDate = '',
    eventInfo.value.endDate = '',
    eventInfo.value.location = '',
    eventInfo.value.description = '',
    eventInfo.value.eventTypeName = '',
    files.value = [];


}
</script>
