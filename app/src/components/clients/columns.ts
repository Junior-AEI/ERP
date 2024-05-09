import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ClientInfo } from '@/types/api'
import { Button } from '../ui/button'
import Icon from '../Icon.vue'

const defaultClasses = 'text-left font-medium'

export const columns: ColumnDef<ClientInfo>[] = [
  
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
    accessorKey: 'name',
    accessorFn: (row) => row.name,
    meta: {
      label: 'Entreprise'
    },
    header: () => h('div', { class: defaultClasses }, 'Entreprise'),
    cell: ({ row }) => {
      const name = row.getValue('name') as string

      return h('div', { class: defaultClasses }, name)
    }
  },
  {
    accessorKey: 'domain',
    accessorFn: (row) => row.function,
    meta: {
      label: 'Domaine'
    },
    header: () => h('div', { class: defaultClasses }, 'Domaine'),
    cell: ({ row }) => {
      const fonction = row.getValue('function') as string

      return h('div', { class: defaultClasses }, fonction)
    }
  },
  {
    accessorKey: 'etude',
    accessorFn: (row) => row.email,
    meta: {
      label: 'Etudes avec AEI'
    },
    header: () => h('div', { class: defaultClasses }, 'Etudes avec AEI'),

    cell: ({ row }) => h('div', { class: `lowercase ${defaultClasses}` }, row.getValue('email'))
  },
  {
    accessorKey: 'premier contact',
    meta: {
      label: 'Premier Contact'
    },
    header: () => h('div', { class: defaultClasses }, 'Premier Contact'),

    cell: ({ row }) => h('div', { class: defaultClasses }, row.getValue('department'))
  },
  {
    accessorKey: 'last_contact',
    meta: {
      label: 'Dernier Contact'
    },
    header: () => h('div', { class: defaultClasses }, 'Dernier Contact'),

    cell: ({ row }) => h('div', { class: defaultClasses }, row.getValue('department'))
  },
]
