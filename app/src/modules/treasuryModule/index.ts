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
          path: 'carte-d-aei',
          name: "Codes de carte D'AEI",
          component: () => import('@/views/Construction.vue'),
          meta: {
            icon: 'credit_card'
          }
        }],
      meta: {
        icon: 'savings'
      }
    }
  ]
}
