import type { Module } from '@/types'

export const documentsModule: Module = {
  name: 'Documents',
  routes: [
    {
      path: '/documents',
      name: 'Documents',
      component: () => import('./views/Documents.vue'),
      meta: {
        icon: 'hard_drive_2'
      }
    }
  ]
}
