import type { Module } from '@/types'

export const treasuryModule: Module = {
  name: 'Trésorerie',
  routes: [
    {
      path: '/treasury',
      name: 'Trésorerie',
      component: () => import('@/views/Construction.vue'),
      meta: {
        icon: 'savings'
      }
    }
  ]
}
