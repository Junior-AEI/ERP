import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { FullMember } from '@/types/api'
import MembersDataTableDropDown from './MembersDataTableButton.vue'
import { Button } from '../ui/button'
import Icon from '../Icon.vue'

const defaultClasses = 'text-left font-medium'

export const columns: ColumnDef<FullMember>[] = [
  {
    accessorKey: 'lastname',
    accessorFn: (row) => row.lastname,
    meta: {
      label: 'Nom'
    },
    header: () => h('div', { class: defaultClasses }, 'Nom'),
    cell: ({ row }) => {
      const lastname = row.getValue('lastname') as string

      return h('div', { class: defaultClasses }, lastname)
    }
  },
  {
    accessorKey: 'firstname',
    accessorFn: (row) => row.firstname,
    meta: {
      label: 'Prénom'
    },
    header: () => h('div', { class: defaultClasses }, 'Prénom'),
    cell: ({ row }) => {
      const firstname = row.getValue('firstname') as string

      return h('div', { class: defaultClasses }, firstname)
    }
  },
  {
    accessorKey: 'mobilePhoneNumber',
    accessorFn: (row) => row.mobilePhone,
    meta: {
      label: 'Téléphone'
    },
    header: () => h('div', { class: defaultClasses }, 'Téléphone'),
    cell: ({ row }) => {
      const mobilePhoneNumber = row.getValue('mobilePhoneNumber') as string

      return h('div', { class: defaultClasses }, mobilePhoneNumber)
    }
  },
  {
    accessorKey: 'email',
    accessorFn: (row) => row.email,
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
            { class: defaultClasses }
          )
        ]
      )
    },
    cell: ({ row }) =>
      h('div', { class: `lowercase px-4 ${defaultClasses}` }, row.getValue('email'))
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
            { class: defaultClasses }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: `${defaultClasses} px-4` }, row.getValue('department'))
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
    cell: ({ row }) =>
      h(
        'div',
        {
          class: `${defaultClasses} px-4`
        },
        row.getValue('promotion')
      )
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
          item: {
            memberId: item.memberId,
            firstname: item.firstname,
            lastname: item.lastname
          }
        })
      )
    }
  }
]
