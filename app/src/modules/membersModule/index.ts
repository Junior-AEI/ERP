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
      },
      children: [
        {
          path: '/members/new',
          name: 'Nouveau membre',
          component: () => import('./createMember.vue'),
          meta: {
            icon: 'group'
          }
        }
      ]
    }
  ]
}
