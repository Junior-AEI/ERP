import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Member } from '@/types/api'
import MembersDataTableDropDown from './MembersDataTableDropDown.vue'
import { Button } from '../ui/button'
import Icon from '../Icon.vue'

const defaultClasses = 'text-right font-medium'

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'lastname',
    meta: {
      label: 'Nom'
    },
    header: () => h('div', { class: 'text-right' }, 'Nom'),
    cell: ({ row }) => {
      const lastname = row.getValue('lastname') as string

      return h('div', { class: defaultClasses }, lastname)
    }
  },
  {
    accessorKey: 'firstname',
    meta: {
      label: 'Prénom'
    },
    header: () => h('div', { class: 'text-right' }, 'Prénom'),
    cell: ({ row }) => {
      const firstname = row.getValue('firstname') as string

      return h('div', { class: defaultClasses }, firstname)
    }
  },
  {
    accessorKey: 'mobilePhoneNumber',
    meta: {
      label: 'Téléphone'
    },
    header: () => h('div', { class: 'text-right' }, 'Téléphone'),
    cell: ({ row }) => {
      const mobilePhoneNumber = row.getValue('mobilePhoneNumber') as string

      return h('div', { class: defaultClasses }, mobilePhoneNumber)
    }
  },
  {
    accessorKey: 'email',
    meta: {
      label: 'Email'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Email',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: `lowercase ${defaultClasses}` }, row.getValue('email'))
  },
  {
    accessorKey: 'department',
    meta: {
      label: 'Filière'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Filière',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: defaultClasses }, row.getValue('department'))
  },
  {
    accessorKey: 'promotion',
    meta: {
      label: 'Promo'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => [
          'Promo',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: '' }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: defaultClasses }, row.getValue('promotion'))
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original

      return h(
        'div',
        { class: 'relative' },
        h(MembersDataTableDropDown, {
          item
        })
      )
    }
  }
]
