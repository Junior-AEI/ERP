import type { Module } from '@/types'

export const eventsModule: Module = {
  name: 'Evénements',
  routes: [
    {
      path: '/events',
      name: 'Evénements',
      component: () => import('@/views/Construction.vue'),
      meta: {
        icon: 'event'
      }
    }
  ]
}
