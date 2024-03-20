import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Member } from '@/types/api'
import { DataTableDropDown } from '@/components/ui/data-table'

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-right' }, 'Identifiant'),
    cell: ({ row }) => {
      const memberId = Number.parseInt(row.getValue('id'))

      return h('div', { class: 'text-right font-medium' }, memberId)
    }
  },
  {
    accessorKey: 'lastname',
    header: () => h('div', { class: 'text-right' }, 'Nom'),
    cell: ({ row }) => {
      const lastname = row.getValue('lastname') as string

      return h('div', { class: 'text-right font-medium' }, lastname)
    }
  },
  {
    accessorKey: 'firstname',
    header: () => h('div', { class: 'text-right' }, 'Prénom'),
    cell: ({ row }) => {
      const firstname = row.getValue('firstname') as string

      return h('div', { class: 'text-right font-medium' }, firstname)
    }
  },
  {
    accessorKey: 'mobilePhoneNumber',
    header: () => h('div', { class: 'text-right' }, 'Téléphone'),
    cell: ({ row }) => {
      const mobilePhoneNumber = row.getValue('mobilePhoneNumber') as string

      return h('div', { class: 'text-right font-medium' }, mobilePhoneNumber)
    }
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-right' }, 'Adresse email'),
    cell: ({ row }) => {
      const email = row.getValue('email') as string

      return h('div', { class: 'text-right font-medium' }, email)
    }
  },
  {
    accessorKey: 'department',
    header: () => h('div', { class: 'text-right' }, 'Filière'),
    cell: ({ row }) => {
      const department = row.getValue('department') as string

      return h('div', { class: 'text-right font-medium' }, department)
    }
  },
  {
    accessorKey: 'promotion',
    header: () => h('div', { class: 'text-right' }, 'Promotion'),
    cell: ({ row }) => {
      const promotion = row.getValue('promotion') as string

      return h('div', { class: 'text-right font-medium' }, promotion)
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
        h(DataTableDropDown, {
          item
        })
      )
    }
  }
]
