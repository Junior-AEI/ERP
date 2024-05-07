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
          path: '/liste-des-prospects',
          name: 'Liste des prospects',
          component: () => import('./Clients.vue'),
          meta: {
            icon: 'contacts'
          }
        },
        {
          path: '/clients/new',
          name: 'Ajouter Client',
          component: () => import('./createClient.vue'),
          meta: {
            icon: 'domain_add'
          }
        }
      ],
      meta: {
        icon: 'work'
      }
    }
  ]
}
