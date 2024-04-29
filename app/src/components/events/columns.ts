import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Event } from '@/types/api'
import EventsDataTableButton from './EventsDataTableButton.vue'
import { Button } from '../ui/button'
import Icon from '../Icon.vue'

const defaultClasses = 'text-left font-medium'

export const columns: ColumnDef<Event>[] = [
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
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('name'))
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
      const startDate = row.getValue('startDate') as Date

      return h('div', { class: defaultClasses }, startDate.toLocaleString())
    }
  },
  {
    accessorKey: 'endDate',
    meta: {
      label: 'endDate'
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
      const endDate = row.getValue('endDate') as Date

      return h('div', { class: defaultClasses }, endDate.toLocaleString())
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
