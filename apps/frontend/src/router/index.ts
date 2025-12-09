import { createWebHistory, createRouter } from 'vue-router'

import GridPage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import BasketPage from '../pages/BasketPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'
import { useUserStore } from '../store/user'

const routes = [
  { path: '/login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/', component: GridPage },
  { path: '/basket', component: BasketPage },
  // 404 catchall route (must be last)
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: { guestOnly: false },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(to => {
  const userStore = useUserStore()

  // If guest-only page (login) and user is logged in, redirect to home
  if (to.meta.guestOnly && userStore.isLoggedIn) {
    return '/'
  }

  // If not guest-only page and user is not logged in, redirect to login
  if (!to.meta.guestOnly && !userStore.isLoggedIn) {
    return '/login'
  }
})
