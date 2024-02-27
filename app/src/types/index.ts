import type { MaterialSymbol } from 'material-symbols'
import type { RouteRecordRaw } from 'vue-router'

/* Noms des Icons */
export type IconNames = MaterialSymbol

/* Position des Modules dans la sidebar */
export type PositionInSidebar = 'top' | 'bottom' | undefined

/* Router */
export type Route = RouteRecordRaw & {
    name: string
    children?: Route[]
    meta: {
        icon: IconNames
        positionInSidebar?: PositionInSidebar
    }
}

export interface Module {
    name: string
    routes: Route[]
}