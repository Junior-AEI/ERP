import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ExtendedProject } from '@/types/api'
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
  return date.toString()
}

export const columns: ColumnDef<ExtendedProject>[] = [
  {
    accessorKey: 'acronym',
    accessorFn: (row) => row.acronym,
    meta: {
      label: 'Acronyme'
    },
    header: () => h('div', { class: defaultClasses }, 'Acronyme'),
    cell: ({ row }) => {
      const acronym = row.getValue('acronym') as string

      return h('div', { class: defaultClasses }, acronym)
    }
  },
  {
    accessorKey: 'nameProject',
    accessorFn: (row) => row.nameProject,
    meta: {
      label: "Nom de l'étude"
    },
    header: () => h('div', { class: defaultClasses }, 'Nom'),
    cell: ({ row }) => {
      const nameProject = row.getValue('nameProject') as string

      return h('div', { class: defaultClasses }, nameProject)
    }
  },
  {
    accessorKey: 'name',
    accessorFn: (row) => row.name,

    meta: {
      label: 'Client'
    },
    header: () => h('div', { class: defaultClasses }, 'Client'),
    cell: ({ row }) => {
      const item = row.original

      return h('div', { class: defaultClasses }, [
        item.name,
        h('br'),
        item.lastname + ' ' + item.firstname
      ])
    }
  },

  {
    accessorKey: 'etude',
    accessorFn: (row) => row.projectManagers,
    meta: {
      label: 'Etudes avec AEI'
    },
    header: () => h('div', { class: defaultClasses }, 'Intervenants'),

    cell: ({ row }) => {
      const item = row.original
      return h(
        'div',
        { class: `lowercase ${defaultClasses}` },
        item.projectManagers.map((manager) => {
          return h('div', { class: `defaultClasses` }, manager.lastname + ' ' + manager.firstname)
        })
      )
    }
  },
  {
    accessorKey: 'etude',
    accessorFn: (row) => row.contributors,
    meta: {
      label: 'Etudes avec AEI'
    },
    header: () => h('div', { class: defaultClasses }, 'Chargés responsables'),

    cell: ({ row }) => {
      const item = row.original
      return h(
        'div',
        { class: `lowercase ${defaultClasses}` },
        item.contributors.map((contributor) => {
          return h(
            'div',
            { class: `defaultClasses` },
            contributor.lastname + ' ' + contributor.firstname
          )
        })
      )
    }
  },
  {
    accessorKey: 'startDate',
    accessorFn: (row) => row.startDate,
    meta: {
      label: 'Date de Début'
    },
    header: () => h('div', { class: defaultClasses }, 'Date de Début'),
    cell: ({ row }) => {
      const startDate = convertToCalendarDate(row.getValue('startDate'))

      return h(
        'div',
        { class: defaultClasses },
        df.format(parseDateTime(startDate).toDate(getLocalTimeZone()))
      )
    }
  },
  {
    accessorKey: 'endDate',
    accessorFn: (row) => row.endDate,
    meta: {
      label: 'Date de Fin'
    },
    header: () => h('div', { class: defaultClasses }, 'Date de Fin'),
    cell: ({ row }) => {
      let colorDate = ''
      const currentDate = new Date().getTime() // Convertir la date actuelle en timestamp UNIX
      const endDate = convertToCalendarDate(row.getValue('endDate'))
      const endDateTime = new Date(row.getValue('endDate')).getTime()

      // Calcul de la différence en jours
      const differenceInDays = Math.floor((endDateTime - currentDate) / (1000 * 60 * 60 * 24))

      // Choix de la couleur en fonction de la différence en jours
      if (differenceInDays < 0) {
        colorDate = 'bg-gray-500' // Date expirée (dans le passé)
      } else if (differenceInDays < 7) {
        colorDate = 'bg-red-500' // Date dans moins d'une semaine
      } else if (differenceInDays < 14) {
        colorDate = 'bg-orange-500' // Date dans moins d'une semaine
      } else {
        colorDate = 'bg-green-500' // Date dans plus d'une semaine
      }

      return h(
        'div',
        { class: `text-white p-1 rounded mr-2 w-28 ${colorDate}` },
        df.format(parseDateTime(endDate).toDate(getLocalTimeZone()))
      )
    }
  }
]
