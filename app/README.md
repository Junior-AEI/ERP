# app

> À refaire

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Modules

L'application est découpée en module. Un module est un ensemble de composants, routes et stores qui forment une fonctionnalité de l'application.
Les modules sont situés dans le dossier `app/modules`. Chaque module est un dossier qui contient au moins un fichier `index.ts`. Ce fichier est le point d'entrée du module et doit exporter un objet qui contient les composants, routes et stores du module.
Les routes sont affichées dans la sidebar de l'application. Les routes enfants sont affichées dans un sous-menu déroulant.

Exemple de module:

```ts
import type { Module } from '@/types'

export const exampleModule: Module = {
    name: 'Example',
    routes: [
        {
            path: '/example',
            name: 'Example',
            component: () => import('./views/Relectures.vue'),
            meta: {
                icon: 'overview',
            },
            children: [
                {
                    path: 'first',
                    name: 'First child route',
                    component: () => import('./views/Relectures.vue'),
                },
                {
                    path: 'second',
                    name: 'Second child route',
                    component: () => import('./views/Relectures.vue'),
                },
            ],
        },
        {
            path: '/AnotherExample',
            name: 'Example detail',
            component: () => import('./views/Relectures.vue'),
            meta: {
                icon: 'overview',
            }
        },
        ...
    ]
}
```

Ces modules doivent ensuite être importés dans le fichier `@/main.ts` pour être chargés par l'application.

```ts
import { registerModule } from '@/lib/registerModule'

import { exampleModule } from './modules/example'
import { anotherModule } from './modules/anotherModule'

registerModule(exampleModule)
registerModule(anotherModule)
```
