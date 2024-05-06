import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { itTicketInfo } from '@/types/api'
import MembersDataTableDropDown from './itTicketDataTableDropDown.vue'
import { Button } from '../ui/button'
import Icon from '../Icon.vue'

const defaultClasses = 'text-left font-medium'



export const columns: ColumnDef<itTicketInfo>[] = [
  {
    accessorKey: 'state',
    accessorFn: (row) => row.state,
    meta: {
      label: 'Etat',
      applyPx0: true
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: 'p-0'
        },
        () => [
          'Etat',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: defaultClasses }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: `${defaultClasses} bg-red-500`}, row.getValue('state'))
  },
  {
    accessorKey: 'applicationConcerned',
    accessorFn: (row) => row.applicationConcerned,
    meta: {
      label: 'Outil Concerné'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: 'p-0'
        },
        () => [
          'Outil Concerné',
          h(
            h(Icon, {
              name: 'unfold_more'
            }),
            { class: defaultClasses }
          )
        ]
      )
    },
    cell: ({ row }) => h('div', { class: defaultClasses }, row.getValue('applicationConcerned'))
  },
  {
    accessorKey: 'title',
    accessorFn: (row) => row.title,
    meta: {
      label: 'Titre'
    },
    header: () => h('div', { class: defaultClasses }, 'Titre'),
    cell: ({ row }) => {
      const title = row.getValue('title') as string

      return h('div', { class: defaultClasses }, title)
    }
  },
  {
    accessorKey: 'username',
    accessorFn: (row) => row.username,
    meta: {
      label: "Nom d'utilisateur"
    },
    header: () => h('div', { class: defaultClasses }, "Nom d'utilisateur"),
    cell: ({ row }) => {
      const username = row.getValue('username') as string

      return h('div', { class: defaultClasses }, username)
    }
  },
  {
    accessorKey: 'createdAt',
    accessorFn: (row) => row.createdAt,
    meta: {
      label: 'Date'
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: 'p-0'
        },
        () => [
          'Date',
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
      const createdAt = new Date(row.getValue('createdAt'));
      const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth() + 1).toString().padStart(2, '0')}/${createdAt.getFullYear()} ${createdAt.getHours().toString().padStart(2, '0')}h${createdAt.getMinutes().toString().padStart(2, '0')}`;
      return h('div', { class: defaultClasses }, formattedDate);
    }
  }
];
