import type { Module } from '@/types'
import router from '@/router'
import { modules } from '@/router'

export function registerModule(module: Module) {


    const routes = module.routes

    /* On ajoute les routes du module dans les routes du router */
    modules.push(...routes)
    routes.forEach((route) => {
        router.addRoute(route)
    })
    /* On ajoute les sous-routes du modules du type '/module/sous-route' dans le router */
    module.routes.forEach((route) => {
        if (route.children) {
            route.children.forEach((childRoute) => {
                router.addRoute(route.name, childRoute)
            })
        }
    })
}