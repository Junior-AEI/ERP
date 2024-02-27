import type { Module } from '@/types'

export const etudesModule: Module = {
    name: 'Études',
    routes: [
        {
            path: '/etudes',
            name: 'Etudes',
            component: () => import('@/views/Construction.vue'),
            meta: {
                icon: 'work'
            }
        },
    ]
}