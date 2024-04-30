import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

import type { Route } from '@/types'
import { useAuthStore } from '@/stores/authStore'

const baseRoutes = [
  {
    path: '/',
    name: 'Tableau de bord',
    component: DashboardView,
    meta: {
      icon: 'dashboard'
    }
  },
  {
    path: '/profile',
    name: 'Mon Profil',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      icon: 'person'
    }
  },
  {
    path: '/profile/:id',
    name: 'Profil de l\'utilisateur',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      icon: 'person'
    }
  },
  {
    path: '/login',
    name: 'Se connecter',
    component: () => import('../views/LoginView.vue'),
    meta: {
      icon: 'login',
      public: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      icon: 'troubleshoot'
    }
  },
]

const modules: Array<Route> = []


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...baseRoutes,
    ...modules
  ]
})

const isPublicRoute = (route: Route | RouteLocationNormalized) => {
  return route.meta.public || false
}

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  if (!isPublicRoute(to) && !authStore.isAuthenticated) {
    return next({ path: '/login' })
  }

  document.title = `${to.name as string} | ${import.meta.env.VITE_APP_NAME}`
  window.scrollTo(0, 0)
  next()
})

export default router
export { baseRoutes, modules }
