<template>
  <header class="bg-white shadow-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <h1 class="text-lg font-semibold text-gray-900">
        <router-link to="/" class="hover:text-blue-600 transition-colors"
          >Mini Cart</router-link
        >
      </h1>
      <div class="flex items-center gap-4">
        <router-link
          to="/basket"
          class="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
        >
          <span>Basket</span>
          <span
            v-if="basketStore.itemCount > 0"
            class="rounded-full bg-blue-600 px-1.5 py-0.5 text-xs text-white"
          >
            {{ basketStore.itemCount }}
          </span>
        </router-link>
        <span class="text-sm text-gray-600">{{ userStore.username }}</span>
        <button
          @click="handleLogout"
          class="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { useBasketStore } from '../store/basket'

const userStore = useUserStore()
const basketStore = useBasketStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  basketStore.$reset()
  router.push('/login')
}
</script>
