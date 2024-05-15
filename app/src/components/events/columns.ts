import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { EventWithDoc } from '@/types/api'
import EventsDataTableButton from './EventsDataTableButton.vue'
import DocumentsViewerDataTableButton from '../documents/DocumentsViewerDataTableButton.vue'

import { Button } from '../ui/button'
import Icon from '../Icon.vue'
import {
  CalendarDateTime,
  parseDateTime,
  DateFormatter,
  getLocalTimeZone
} from '@internationalized/date'

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
  // Create and return a new CalendarDate object
  return new CalendarDateTime(year, month, day, hour, minute).toString()
}



const defaultClasses = 'text-left font-medium'

export const columns: ColumnDef<EventWithDoc>[] = [
  {
    accessorKey: 'name',
    meta: {
      label: 'Nom'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Nom',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: 'text-leftbah ' }, row.getValue('name'))
  },
  {
    accessorKey: 'startDate',
    meta: {
      label: 'Date de début'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Date de début',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: defaultClasses }
          )
        ]
      )
    },
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
    meta: {
      label: 'Date de fin'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Date de fin',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: defaultClasses }
          )
        ]
      )
    },
    cell: ({ row }) => {
      const endDate = convertToCalendarDate(row.getValue('endDate'))

      return h(
        'div',
        { class: defaultClasses },
        df.format(parseDateTime(endDate).toDate(getLocalTimeZone()))
      )
    }
  },
  {
    accessorKey: 'location',
    meta: {
      label: 'Lieu'
    },
    header: () => h('div', { class: defaultClasses }, 'Lieu'),
    cell: ({ row }) => {
      const location = row.getValue('location') as string

      return h('div', { class: defaultClasses }, location)
    }
  },
  {
    accessorKey: 'eventTypeName',
    meta: {
      label: "Type d'événement"
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          "Type d'événement",
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('eventTypeName'))
  },
  {
    accessorKey: 'eventTypeName',
    meta: {
      label: "Document lié"
    },
    header: () => h('div', { class: defaultClasses }, 'Document lié'),
    cell: ({ row }) => {
      const item = row.original

      return h(
        'div',
        { class: `lowercase ${defaultClasses}` },
        item.documentList.map((document) => {
          return h(
            'div',
            { class: 'relative' },
            h(DocumentsViewerDataTableButton, {
              item : document
            })
          )
        })
      )
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original

      return h(
        'div',
        { class: 'relative' },
        h(EventsDataTableButton, {
          item
        })
      )
    }
  }
]
