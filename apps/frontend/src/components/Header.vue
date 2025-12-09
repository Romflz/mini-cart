<template>
  <header class="bg-white shadow-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <h1 class="text-lg font-semibold text-gray-900">Mini Cart</h1>
      <div class="flex items-center gap-4">
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

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>
