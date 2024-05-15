<template>
  <Card>
    <CardContent>
      <div class="flex flex-1 cursor-pointer flex-row items-center gap-2" @click="handleClick">
        <!-- <Icon name="app_registration"></Icon> -->
        <div class="flex flex-1 flex-col gap-2">
          <div class="gap- flex flex-1 flex-row items-center gap-3">
            <span class="text-2xl font-bold text-accent">
              {{ props.infos.acronym }}
            </span>
            <span class="text-m">
              {{ props.infos.name }}
            </span>
          </div>
          <div class="ml-4 flex flex-1 flex-wrap justify-start gap-4">
            <Card class="flex w-fit flex-row">
              <div :class="bg_color(delay(props.infos.endDate))">Date de Fin</div>
              <CardContent class="m-2 ml-4 mr-4 flex flex-1 flex-row items-center gap-4 p-0">
                <div class="flex flex-row items-center justify-between gap-2">
                  <span>Le {{ convertToCalendarDate(props.infos.endDate) }} </span>

                  <span v-if="delay(props.infos.endDate) > 0" class="text-muted-foreground/50">
                    (dans {{ delay(props.infos.endDate) }} j)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card class="flex w-fit flex-row">
              <div
                class="bg-deep-accent text-deep-accent-foreground flex h-full w-fit items-center justify-center rounded-s-xl pl-2 pr-2">
                Client
              </div>
              <CardContent class="m-2 ml-4 mr-4 flex flex-1 flex-row items-center gap-4 p-0">
                <div class="flex flex-row items-center justify-start">
                  <span> {{ props.infos.firstname }} {{ props.infos.lastname }} </span>
                </div>
              </CardContent>
            </Card>

            <Card class="flex w-fit flex-row">
              <div class="flex h-full w-fit items-center justify-center rounded-s-xl bg-black/30 pl-2 pr-2">
                Chargé d'Étude
              </div>
              <CardContent class="m-2 ml-4 mr-4 flex flex-1 flex-row items-center gap-4 p-0">
                <div class="flex flex-wrap">
                  <div v-for="(manager, index) in props.infos.projectManagers" :key="manager.firstname"
                    class="flex flex-row items-center justify-start">
                    {{ manager.firstname }} {{ manager.lastname }}
                    <span v-if="index !== props.infos.projectManagers.length - 1"> / </span>


                  </div>
                </div>
              </CardContent>
            </Card>

            <Card class="flex w-fit flex-row">
              <div class="flex h-full w-fit items-center justify-center rounded-s-xl bg-black/30 pl-2 pr-2">
                Intervenants
              </div>
              <CardContent class="m-2 ml-4 mr-4 flex flex-1 flex-row items-center gap-4 p-0">
                <div class="flex flex-row items-center justify-start">
                  <template v-for="(contributor, index) in props.infos.contributors" :key="contributor.lastname">
                    {{ contributor.firstname }} {{ contributor.lastname }}
                    <span v-if="index !== props.infos.contributors.length - 1"> / </span>
                  </template>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { type ExtendedProject } from '@/types/api'
import { defineProps } from 'vue'
import {
  CalendarDateTime,
  parseDateTime,
  DateFormatter,
  getLocalTimeZone
} from '@internationalized/date'

const props = defineProps<{
  infos: ExtendedProject
}>()

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

function delay(isoDateString: string): number {
  const currentDate = new Date().getTime() // Convertir la date actuelle en timestamp UNIX
  const endDateTime = new Date(isoDateString).getTime()

  // Calcul de la différence en jours
  return Math.floor((endDateTime - currentDate) / (1000 * 60 * 60 * 24))
}

function bg_color(differenceInDays: number): string {
  let colorDate = ''

  // Choix de la couleur en fonction de la différence en jours
  if (differenceInDays < 0) {
    colorDate = 'w-fit h-full rounded-s-xl flex justify-center items-center pr-2 pl-2 bg-blue-500' // Date expirée (dans le passé)
  } else if (differenceInDays < 7) {
    colorDate = 'w-fit h-full rounded-s-xl flex justify-center items-center pr-2 pl-2 bg-red-500' // Date dans moins d'une semaine
  } else if (differenceInDays < 14) {
    colorDate = 'w-fit h-full rounded-s-xl flex justify-center items-center pr-2 pl-2 bg-orange-500' // Date dans moins d'une semaine
  } else {
    colorDate = 'w-fit h-full rounded-s-xl flex justify-center items-center pr-2 pl-2 bg-green-300' // Date dans plus d'une semaine
  }

  // Calcul de la différence en jours
  return colorDate
}
import { useRouter } from 'vue-router'
const router = useRouter()
const handleClick = () => {
  router.push({
    path: '/projects/details',
    query: { id: props.infos.projectId }
  })
}
</script>
