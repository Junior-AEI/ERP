import type { Module } from '@/types'

export const membresModule: Module = {
  name: 'Membres',
  routes: [
    {
      path: '/membres',
      name: 'Membres',
      component: () => import('./Membres.vue'),
      meta: {
        icon: 'group'
      }
    }
  ]
}
