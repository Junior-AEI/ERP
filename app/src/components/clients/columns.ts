import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ClientInfoForTable } from '@/types/api'

const defaultClasses = 'text-left font-medium'

export const columns: ColumnDef<ClientInfoForTable>[] = [

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
    accessorKey: 'activityField',
    accessorFn: (row) => row.activityField,
    meta: {
      label: 'Domaine'
    },
    header: () => h('div', { class: defaultClasses }, 'Domaine'),
    cell: ({ row }) => {
      const fonction = row.getValue('activityField') as string

      return h('div', { class: defaultClasses }, fonction)
    }
  },
  {
    accessorKey: 'etude',
    accessorFn: (row) => row.Projectsname,
    meta: {
      label: 'Etudes avec AEI'
    },
    header: () => h('div', { class: defaultClasses }, 'Etudes avec AEI'),

    cell: ({ row }) => {
      const item = row.original
      const badgeColorClass = 'bg-gray-100'
      return h('div', { class: `lowercase ${defaultClasses}` },
        item.Projectsname.map((projectName) => {
          return h('div', { class: `text-black text-center p-1 rounded m-2 w-20 ${badgeColorClass}` }, projectName);
        })
      );
    }
  },
  {
    accessorKey: 'firstContact',
    accessorFn: (row) => row.firstContact,
    meta: {
      label: 'Premier Contact'
    },
    header: () => h('div', { class: defaultClasses }, 'Premier Contact'),
    cell: ({ row }) => {

      const firstContact = row.getValue('firstContact') as string

      return h('div', { class: defaultClasses }, firstContact)
    }
  },
]
