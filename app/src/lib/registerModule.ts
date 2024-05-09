import type { Module, Route } from '@/types'
import router from '@/router'
import { modules } from '@/router'

const appendRouteRecursive = (route: Route, parentRoute?: Route) => {
  if (parentRoute) {
    route.path = `${parentRoute.path}${route.path}`
  }
  router.addRoute(route)
  if (route.children) {
    route.children.forEach((childRoute: Route) => {
      appendRouteRecursive(childRoute, route)
    })
  }
}

export function registerModule(module: Module) {
  const routes = module.routes

  /* On ajoute les routes du module dans les routes du router */
  modules.push(...routes)
  routes.forEach((route) => {
    appendRouteRecursive(route)
  })

}
