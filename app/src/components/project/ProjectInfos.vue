<template>

    
        <div class="flex flex-1 flex-col max-w-md min-w-72 gap-4 ">
            <div class="flex flex-1 justify-between items-center gap-2 ">
                <span>Nom : </span><span>{{ props.infos.nameProject }}</span>
                <span class="text-muted-foreground ">({{ props.infos.acronym }})</span>
            </div>
            <div class="flex flex-1 justify-between items-center gap-2 ">
                <span>Date : </span><span> du {{ convertToCalendarDate(props.infos.startDate) }} au {{ convertToCalendarDate(props.infos.endDate) }}</span>
            </div>
            <div class="flex flex-1 justify-between items-center gap-2 ">
                <span>Client : </span><span>{{ props.infos.firstname }} {{ props.infos.lastname }} de {{ props.infos.name }}</span>
            </div>
            <div class="flex flex-1 justify-between items-center gap-2 ">
                <span>Chargé d'Étude : </span><span>{{ props.infos.projectManagers[0].firstname }} {{ props.infos.projectManagers[0].lastname }}</span>
            </div>
            <div class="flex flex-1 justify-between items-center gap-2 ">
                <span>Intervenants : </span><span>{{ props.infos.contributors[0].firstname }} {{ props.infos.contributors[0].lastname }}</span>
            </div>
        </div>


</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type ExtendedProject } from '@/types/api'

const props = defineProps<{
  infos: ExtendedProject
}>()


import {
    CalendarDateTime,
    parseDateTime,
    DateFormatter,
    getLocalTimeZone
} from '@internationalized/date'

const defaultClasses = 'text-left font-medium'
const df = new DateFormatter('fr-FR', {
    dateStyle: 'long'
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

    const date = new CalendarDateTime(year, month, day, hour, minute)
    // Create and return a new CalendarDate object
    const dateFormat = date.toString()
    return df.format(parseDateTime(dateFormat).toDate(getLocalTimeZone()))
}

console.log(props.infos);


</script>
