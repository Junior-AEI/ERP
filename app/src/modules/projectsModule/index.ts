import type { Module } from '@/types'

export const projectsModule: Module = {
  name: 'Projects',
  routes: [
    {
      path: '/projects',
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
