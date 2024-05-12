import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ExtendedDocument } from '@/types/api'
import { Button } from '@/components/ui/button'
import DocumentsDataTableButton from './DocumentsDataTableButton.vue'
import Icon from '@/components/Icon.vue'
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


export const columns: ColumnDef<ExtendedDocument>[] = [
  {
    accessorKey: 'type',
    meta: {
      label: 'Nom du document'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Nom du document',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: 'text-left ' }, row.original.name)
  },
  {
    accessorKey: 'acronym',
    meta: {
      label: 'Étude'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Étude',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => {
      return h('div', { class: 'text-left ' }, row.getValue('acronym'))
    }
  },
  {
    accessorKey: 'type',
    meta: {
      label: 'Type de document'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Type de document',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: 'text-left ' }, row.getValue('type'))
  },
  {
    accessorKey: 'version',
    meta: {
      label: 'Version'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Version',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: 'text-left ' }, row.getValue('version'))
  },
  {
    accessorKey: 'status',
    meta: {
      label: 'Statut'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Statut',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: 'text-left ' }, row.getValue('status'))
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original
      return h(
        'div',
        { class: 'relative' },
        h(DocumentsDataTableButton, {
          item
        })
      )
    }
  }
]
