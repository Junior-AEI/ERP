import type { Module } from '@/types'

export const requestNFGModule: Module = {
  name: 'Demander une note de frais',
  routes: [
    {
      path: '/request-nfg',
      name: 'Demander une note de frais',
      component: () => import('@/views/Construction.vue'),
      meta: {
        icon: 'receipt_long',
        positionInSidebar: 'bottom'
      }
    }
  ]
}
