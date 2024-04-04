import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

import type { Route } from '@/types'
import { useAuthStore } from '@/stores/authStore'

const modules: Array<Route> = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Tableau de bord',
      component: DashboardView,
      meta: {
        icon: 'dashboard'
      }
    },
    {
      path: '/profil',
      name: 'Mon Profil',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        icon: 'person'
      }
    },
    {
      path: '/membres',
      name: 'Membres',
      component: () => import('../views/MembersView.vue'),
      meta: {
        icon: 'people'
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
export { modules }
