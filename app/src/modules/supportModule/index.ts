import type { Module } from '@/types'

export const supportModule: Module = {
  name: "Demande d'assistance",
  routes: [
    {
      path: '/assistance',
      name: "Demande d'assistance",
      component: () => import('./views/SupportView.vue'),
      meta: {
        icon: 'support_agent',
        positionInSidebar: 'bottom'
      }
    }
  ]
}
