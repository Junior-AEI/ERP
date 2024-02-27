/* Import des styles */
import './assets/main.css'
import './assets/inter/inter.css'
import 'material-symbols'

import { createApp } from 'vue'


import App from './App.vue'

const app = createApp(App)

/* Import des modules de l'application */
/* <!> Il faut les importer avant de définir le router <!> */

import { registerModule } from '@/lib/registerModule'
import { relectures } from '@/modules/relectures'

registerModule(relectures)

/* Définition des stores */

import { createPinia } from 'pinia'
app.use(createPinia())

/* Définition du router */

import router from './router'
app.use(router)


/* Import des plugin vue */

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
app.use(autoAnimatePlugin)

app.mount('#app')
