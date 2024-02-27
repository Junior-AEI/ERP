import type { Route } from '@/types'

const modules: Array<Route> = [
  {
    path: '/documents',
    name: 'Documents',
    component: () => import('../views/Construction.vue'),
    meta: {
      icon: 'folder'
    }
  },
  {
    path: '/membres',
    name: 'Membres',
    component: () => import('../views/Construction.vue'),
    meta: {
      icon: 'group'
    }
  },
  {
    path: '/etudes',
    name: 'Etudes',
    component: () => import('../views/Construction.vue'),
    meta: {
      icon: 'work'
    }
  },
  {
    path: '/tresorerie',
    name: 'Trésorerie',
    component: () => import('../views/Construction.vue'),
    meta: {
      icon: 'savings'
    }
  },
  {
    path: '/evenements',
    name: 'Evénements',
    component: () => import('../views/Construction.vue'),
    meta: {
      icon: 'event'
    }
  },
  {
    path: '/administration',
    name: 'Administration',
    component: () => import('../views/Construction.vue'),
    meta: {
      icon: 'build'
    }
  },
  {
    path: '/demander-une-note-de-frais',
    name: 'Demander une note de frais',
    component: () => import('../views/Construction.vue'),
    meta: {
      icon: 'savings',
      positionInSidebar: 'bottom'
    }
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('../views/Construction.vue'),
    meta: {
      icon: 'support_agent',
      positionInSidebar: 'bottom'
    }
  }
]


export { modules }
