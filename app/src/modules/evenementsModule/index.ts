import type { Module } from '@/types'

export const evenementsModule: Module = {
    name: 'Evénements',
    routes: [
        {
            path: '/evenements',
            name: 'Evénements',
            component: () => import('@/views/Construction.vue'),
            meta: {
                icon: 'event'
            }
        },
    ]
}