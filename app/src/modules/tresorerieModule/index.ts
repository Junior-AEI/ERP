import type { Module } from '@/types'

export const tresorerieModule: Module = {
    name: 'Trésorerie',
    routes: [
        {
            path: '/tresorerie',
            name: 'Trésorerie',
            component: () => import('@/views/Construction.vue'),
            meta: {
                icon: 'savings',
            }
        }
    ]
}