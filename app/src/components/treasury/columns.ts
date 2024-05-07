import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ExpenseAccountInfo } from '@/types/api'
import ExpenseDataTableButton from './ExpenseDataTableButton.vue'
import { Button } from '../ui/button'
import Icon from '../Icon.vue'
import { CalendarDateTime, parseDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import ExpenseDataTableDropDown from './ExpenseDataTableDropDown.vue'


const defaultClasses = 'text-left font-medium'

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long',

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


export const columns: ColumnDef<ExpenseAccountInfo>[] = [
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
        case 'A Traiter':
          badgeColorClass = 'bg-red-500';
          break;
        case 'En cours':
          badgeColorClass = 'bg-orange-500';
          break;
        case 'Traitée':
          badgeColorClass = 'bg-green-500';
          break;
        default:
          badgeColorClass = 'bg-gray-500';
      }

      return h('div', { class: 'flex items-center' }, [
        h('div', { class: `text-white p-1 rounded mr-2 ${badgeColorClass}` }, row.getValue('state')),
        h(ExpenseDataTableDropDown, {
          item: {
            expenseId: item.expenseId,
            userId: item.userId,
            state: item.state,
            reason : item.reason,
            description: item.description,
            approbatorId: item.approbatorId,
            expenseDate: item.expenseDate,

          }
        })
      ]);
    }
  },

  {
    accessorKey: 'usernameUser',
    accessorFn: (row) => row.usernameUser,
    meta: {
      label: 'Demandeur'
    },
    header: () => h('div', { class: defaultClasses }, 'Demandeur'),
    cell: ({ row }) => {
      const username = row.getValue('usernameUser') as string

      return h('div', { class: defaultClasses }, username)
    }
  },
  {
    accessorKey: 'reason',
    accessorFn: (row) => row.reason,
    meta: {
      label: 'Motif'
    },
    header: () => h('div', { class: defaultClasses }, 'Motif'),
    cell: ({ row }) => {
      const reason = row.getValue('reason') as string

      return h('div', { class: defaultClasses }, reason)
    }
  },
  
  {
    accessorKey: 'usernameApprobator',
    accessorFn: (row) => row.usernameApprobator,
    meta: {
      label: 'Approbateur'
    },
    header: () => h('div', { class: defaultClasses }, 'Approbateur'),
    cell: ({ row }) => {
      const username = row.getValue('usernameApprobator') as string

      return h('div', { class: defaultClasses }, username)
    }
  },
  {
    accessorKey: 'expenseDate',
    accessorFn: (row) => row.expenseDate,
    meta: {
      label: 'Date de la dépense'
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
          'Date de la dépense',
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
      const expenseDate = convertToCalendarDate(row.getValue('expenseDate'))

      return h(
        'div',
        { class: defaultClasses },
        df.format(parseDateTime(expenseDate).toDate(getLocalTimeZone()))
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
