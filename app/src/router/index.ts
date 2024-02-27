import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import NotFound from '../views/NotFound.vue'
import type { Route } from './routes'
import { modules, subRoutes } from './routes'

const APP_NAME = 'ERP - Junior AEI'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Tableau de bord',
      component: DashboardView,
      meta: {
        icon: 'dashboard'
      },
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
    ...modules,
    ...subRoutes
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.name as string} | ${APP_NAME}`
  window.scrollTo(0, 0)
  next()
})

const registerModule = (module: Route) => {
  modules.push(module)
  router.addRoute(module)
  module.meta.subRoutes?.forEach(subRoute => {
    subRoutes.push(subRoute)
    router.addRoute(subRoute)
  })
}


export default router
export { registerModule }
