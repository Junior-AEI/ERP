import type { Module } from '@/types'

export const demandeNFGModule: Module = {
  name: 'Demander une note de frais',
  routes: [
    {
      path: '/demander-une-note-de-frais',
      name: 'Demander une note de frais',
      component: () => import('@/views/Construction.vue'),
      meta: {
        icon: 'savings',
        positionInSidebar: 'bottom'
      }
    }
  ]
}
