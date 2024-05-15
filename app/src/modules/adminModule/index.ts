import type { Module } from '@/types'

export const adminModule: Module = {
  name: 'Administration',
  routes: [
    {
      path: '/admin',
      name: 'Administration',
      component: () => import('@/views/Construction.vue'),
      meta: {
        icon: 'build'
      },
      children: [
        {
          path: '/parametres-erp',
          name: "Paramétrage de l'ERP",
          component: () => import('@/views/Construction.vue'),
          meta: {
            icon: 'construction'
          }
        },
        {
          path: '/gestion-tickets',
          name: 'Gestion des Tickets',
          component: () => import('./views/SupportAdmin.vue'),
          meta: {
            icon: 'construction'
          }
        }
      ]
    },
    {
      path: '/assistance',
      name: "Demande d'assistance",
      component: () => import('./views/AskSupportForm.vue'),
      meta: {
        icon: 'support_agent',
        positionInSidebar: 'bottom'
      }
    }
  ]
}
