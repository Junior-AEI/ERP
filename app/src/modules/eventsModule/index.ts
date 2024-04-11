import type { Module } from '@/types'

export const eventsModule: Module = {
  name: 'Evénements',
  routes: [
    {
      path: '/events',
      name: 'Evénements',
      component: () => import('./Events.vue'),
      meta: {
        icon: 'event'
      }
    }
  ]
}
