import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import NotFound from '../views/NotFound.vue'
import { modules } from './routes'

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
      path: '/login',
      name: 'Se connecter',
      component: () => import('../views/LoginView.vue'),
      meta: {
        icon: 'login'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        icon: 'troubleshoot'
      }
    },
    ...modules
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.name as string} | ${import.meta.env.VITE_APP_NAME}`
  window.scrollTo(0, 0)
  next()
})


export default router

