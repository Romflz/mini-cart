import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

// Init Pinia store BEFORE. For router check
app.use(pinia)
app.use(router)
app.mount('#app')
