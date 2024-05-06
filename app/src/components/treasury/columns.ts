import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { itTicketInfo } from '@/types/api'
import ExpenseDataTableButton from './ExpenseDataTableButton.vue'
import { Button } from '../ui/button'
import Icon from '../Icon.vue'
import { CalendarDateTime, parseDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import ExpenseDataTableDropDown from './ExpenseDataTableDropDown.vue'


const defaultClasses = 'text-left font-medium'

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short'

})
function convertToCalendarDate(isoDateString: string): string {
  const dateObject = new Date(isoDateString);

  // Check if the date object is valid
  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid date string');
  }

  // Extract year, month, and day from the date object
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Months are 0-based in JavaScript
  const day = dateObject.getDate();
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();



  const date = new CalendarDateTime(year, month, day, hour, minute)
  // Create and return a new CalendarDate object
  return date.toString();
}


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
    cell: ({ row }) => {
      const item = row.original

      let badgeColorClass = '';
      switch (row.getValue('state')) {
        case 'A faire':
          badgeColorClass = 'bg-red-500';
          break;
        case 'En cours':
          badgeColorClass = 'bg-orange-500';
          break;
        case 'Clos':
          badgeColorClass = 'bg-green-500';
          break;
        default:
          badgeColorClass = 'bg-gray-500';
      }

      return h('div', { class: 'flex items-center' }, [
        h('div', { class: `text-white p-1 rounded mr-2 ${badgeColorClass}` }, row.getValue('state')),
        h(ExpenseDataTableDropDown, {
          item: {
            ticketId: item.ticketId,
            userId: item.userId,
            state: item.state,
            title: item.title,
            description: item.description,
            applicationConcerned: item.applicationConcerned,
            createdAt: item.createdAt,

          }
        })
      ]);
    }
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
    cell: ({ row }) => {
      let badgeColorClass = '';
      switch (row.getValue('applicationConcerned')) {
        case 'Passbolt':
          badgeColorClass = 'bg-blue-500';
          break;
        case 'Wiikix':
          badgeColorClass = 'bg-orange-500';
          break;
        case 'ERP':
          badgeColorClass = 'bg-red-500';
          break;
        case 'Mail':
          badgeColorClass = 'bg-green-500';
          break;
        default:
          badgeColorClass = 'bg-gray-500';
      }

      return h('div', { class: `${defaultClasses} flex items-center` }, [
        h('div', { class: `text-white p-1 rounded mr-2 ${badgeColorClass}` }, row.getValue('applicationConcerned')),
      ]);
    }
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
      const createdAt = convertToCalendarDate(row.getValue('createdAt'))

      return h(
        'div',
        { class: defaultClasses },
        df.format(parseDateTime(createdAt).toDate(getLocalTimeZone()))
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
        h(ExpenseDataTableButton, {
          item
        })
      )
    }
  }
];
