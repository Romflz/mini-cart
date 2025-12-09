import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './store/user'

const pinia = createPinia()
const app = createApp(App)

// Init Pinia store BEFORE. For router check
app.use(pinia)

// Verify JWT on app init before mounting
const userStore = useUserStore()

// We first initialize the user, as we need to populate data
userStore
  .init()
  .then(() => {
    // Then we mount the router, so we can run the router guards as we need
    app.use(router)
  })
  .finally(() => {
    // Mount the app at the end. Peak production JS code
    app.mount('#app')
  })
