import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ExtendedDocument } from '@/types/api'
import { Button } from '@/components/ui/button'
import DocumentsDataTableButton from './DocumentsDataTableButton.vue'
import Icon from '@/components/Icon.vue'

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
    cell: ({ row }) => {
      let colorStatus = ''
      const status = (row.getValue('status') as any).toString()
      if (status === 'Relu') {
        colorStatus = 'bg-green-500'
      } else if (status === 'A relire') {
        colorStatus = 'bg-gray-500'
      } else if (status === 'A corriger') {
        colorStatus = 'bg-red-500'
      }
      return h('div', { class: `text-left text-white p-1 rounded mr-2 w-28 ${colorStatus}` }, status)
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
        h(DocumentsDataTableButton, {
          item
        })
      )
    }
  }
]
