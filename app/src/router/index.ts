import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const APP_NAME = 'ERP - Junior AEI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/login',
      name: 'Se connecter',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.name as string} | ${APP_NAME}`
  window.scrollTo(0, 0)
  next()
})

export default router
