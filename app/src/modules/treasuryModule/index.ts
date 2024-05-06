import type { Module } from '@/types'

export const treasuryModule: Module = {
  name: 'Trésorerie',
  routes: [
    {
      path: '/treasury',
      name: 'Trésorerie',
      component: () => import('./views/DashBoardTreasuryView.vue'),
      children: [
        {
          path: '/notes-de-frais',
          name: "Notes de Frais",
          component: () => import('./views/ExpenseAdmin.vue'),
          meta: {
            icon: 'credit_card'
          }
        }
      ],
      meta: {
        icon: 'savings'
      }
    },
    {
      path: '/request-nfg',
      name: 'Demander une note de frais',
      component: () => import('./views/AskExpenseForm.vue'),
      meta: {
        icon: 'receipt_long',
        positionInSidebar: 'bottom'
      }
    }
  ]
}
