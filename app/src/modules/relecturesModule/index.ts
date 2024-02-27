import type { Module } from '@/types'

export const relecturesModule: Module = {
  name: 'Relectures',
  routes: [
    {
      path: '/relectures',
      name: 'Relectures',
      component: () => import('./views/Relectures.vue'),
      meta: {
        icon: 'ink_highlighter_move'
      }
    }
  ]
}
