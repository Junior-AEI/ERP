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
          component: () => import('./views/SettingsView.vue'),
          meta: {
            icon: 'construction'
          }},{
          path: '/gestion-tickets',
          name: 'Gestion des Tickets',
          component: () => import('./views/SupportAdmin.vue'),
          meta: {
            icon: 'construction'
          }
        }
      ],
    }
  ]
}
