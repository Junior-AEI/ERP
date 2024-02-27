import type { Module } from '@/types'

export const relectures: Module = {
    name: 'Relectures',
    routes: [
        {
            path: '/relectures',
            name: 'Relectures',
            component: () => import('./views/Relectures.vue'),
            meta: {
                icon: 'overview',
            }
        }
    ]
}