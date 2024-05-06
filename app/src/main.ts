/* Import des styles */
import './assets/main.css'
import './assets/inter/inter.css'
import 'material-symbols'

import { createApp, watch } from 'vue'

import App from './App.vue'

const app = createApp(App)

/* Import des modules de l'application */
/* <!> Il faut les importer avant de définir le router <!> */

import { registerModule } from '@/lib/registerModule'
import { membersModule } from '@/modules/membersModule'
import { projectsModule } from '@/modules/projectsModule'
import { reviewsModule } from '@/modules/reviewsModule'
import { eventsModule } from '@/modules/eventsModule'
import { documentsModule } from '@/modules/documentsModule'
import { treasuryModule } from '@/modules/treasuryModule'
import { adminModule } from '@/modules/adminModule'

registerModule(eventsModule)
registerModule(adminModule)
registerModule(treasuryModule)
registerModule(membersModule)
registerModule(projectsModule)
registerModule(documentsModule)
registerModule(reviewsModule)

/* Définition des stores */

import { createPinia } from 'pinia'

const pinia = createPinia()
app.use(pinia)

/* Définition du router */

import router from './router'
app.use(router)

/* Import des plugin vue */

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
app.use(autoAnimatePlugin)

/* Configuration d'axios */

const authStore = useAuthStore()

import axios from 'axios'
import { useAuthStore } from './stores/authStore'
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${authStore.token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

app.mount('#app')
