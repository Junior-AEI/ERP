import type { Module } from '@/types'

export const etudesModule: Module = {
  name: 'Études',
  routes: [
    {
      path: '/etudes',
      name: 'Etudes',
      component: () => import('@/views/Construction.vue'),
      children: [
        {
          path: 'liste-des-prospects',
          name: 'Liste des prospects',
          component: () => import('@/views/Construction.vue'),
          meta: {
            icon: 'contacts'
          }
        }
      ],
      meta: {
        icon: 'work'
      }
    }
  ]
}
