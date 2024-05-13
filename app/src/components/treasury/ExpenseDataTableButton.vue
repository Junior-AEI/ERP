<template>
  <div class="col-2">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline" class="" @click="openDialog(item)"> Infos + </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demande de Note de Frais n° {{ selectedExpense?.expenseId }}</DialogTitle>
        </DialogHeader>
        <div class="grid">
          <div class="flex flex-col justify-between">
            <h3>Etat de la Demande</h3>
            <h4 class="my-2">{{ selectedExpense?.state }}</h4>
            <h3>Demandeur de la Note de Frais</h3>
            <h4 class="my-2">{{ selectedExpense?.usernameUser }}</h4>
            <h3>Approbateur</h3>
            <h4 class="my-2">{{ selectedExpense?.usernameApprobator }}</h4>
            <h3>Date d'émission du ticket</h3>
            <h4 class="my-2">{{ dateFormatedFunction() }}</h4>
            <h3>Description détaillé</h3>
            <h4 class="my-2">{{ selectedExpense?.description }}</h4>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CalendarDateTime,
  parseDateTime,
  DateFormatter,
  getLocalTimeZone
} from '@internationalized/date'

import type { ExpenseAccountInfo } from '@/types/api'

defineProps<{
  item: ExpenseAccountInfo
}>()

const selectedExpense = ref<ExpenseAccountInfo>()

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
  if (selectedExpense.value) {
    const expenseDate = convertToCalendarDate(selectedExpense.value.expenseDate)

    dateFormated = df.format(parseDateTime(expenseDate).toDate(getLocalTimeZone()))
  }
  return dateFormated
}

const openDialog = (expenseAccount: ExpenseAccountInfo) => {
  selectedExpense.value = expenseAccount
}
</script>
