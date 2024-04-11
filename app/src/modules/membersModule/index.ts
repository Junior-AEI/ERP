import type { Module } from '@/types'

export const membersModule: Module = {
  name: 'Members',
  routes: [
    {
      path: '/members',
      name: 'Membres',
      component: () => import('./Members.vue'),
      meta: {
        icon: 'group'
      }
    }
  ]
}
