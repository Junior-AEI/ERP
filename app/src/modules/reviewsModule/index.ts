import type { Module } from '@/types'

export const reviewsModule: Module = {
  name: 'Relectures',
  routes: [
    {
      path: '/reviews',
      name: 'Relectures',
      component: () => import('./views/Reviews.vue'),
      meta: {
        icon: 'ink_highlighter_move'
      }
    }
  ]
}
