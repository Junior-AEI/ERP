import type { Module } from '@/types'

export const projectsModule: Module = {
  name: 'Projects',
  routes: [
    {
      path: '/projects',
      name: 'Etudes',
      component: () => import('./Projects.vue'),
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
        },
        {
          path: '/new',
          name: 'Ajouter Etude',
          component: () => import('./createProject.vue'),
          meta: {
            icon: 'domain_add'
          }
        },
        {
          path: '/details/:projectId',
          name: 'Détails Etude',
          component: () => import('./ProjectDetails.vue'),
          meta: {
            visible: false,
            icon: 'article'
          }
        }
      ],
      meta: {
        icon: 'work'
      }
    }
  ]
}
