<template>
  <div class="col-2">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline" class="" @click="openDialog(item)"> Infos + </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ticket n° {{ selectedItTicket?.ticketId }}</DialogTitle>
        </DialogHeader>
        <div class="grid">
          <div class="flex flex-col justify-between">
            <h3>Etat du Ticket</h3>
            <h4 class="my-2">{{ selectedItTicket?.state }}</h4>
            <h3>Utilisateur concerné</h3>
            <h4 class="my-2">{{ selectedItTicket?.username }}</h4>
            <h3>Outil concerné</h3>
            <h4 class="my-2">{{ selectedItTicket?.applicationConcerned }}</h4>
            <h3>Date d'émission du ticket</h3>
            <h4 class="my-2">{{ dateFormatedFunction() }}</h4>
            <h3>Description détaillé</h3>
            <h4 class="my-2">{{ selectedItTicket?.description }}</h4>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CalendarDateTime,
  parseDateTime,
  DateFormatter,
  getLocalTimeZone
} from '@internationalized/date'

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
import type { itTicketInfo } from '@/types/api'
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

import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const props = defineProps<{
  item: itTicketInfo
}>()

const selectedItTicket = ref<itTicketInfo>()

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
  // Create and return a new CalendarDate object
  return date.toString()
}
let dateFormated = ''

function dateFormatedFunction(): string {
  if (selectedItTicket.value) {
    const createdAt = convertToCalendarDate(selectedItTicket.value.createdAt)

    dateFormated = df.format(parseDateTime(createdAt).toDate(getLocalTimeZone()))
  }
  return dateFormated
}

const openDialog = (itTicket: itTicketInfo) => {
  selectedItTicket.value = itTicket
}
</script>
