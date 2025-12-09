<template>
  <LoginLayout>
    <div
      class="flex min-h-screen items-center justify-center px-4 bg-linear-to-br from-blue-50 via-white to-purple-50"
    >
      <div
        class="w-full max-w-sm space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8"
      >
        <div class="text-center">
          <div
            class="mx-auto w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4"
          >
            <UserIcon class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p class="mt-2 text-sm text-gray-500">Sign in to your account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              id="username"
              v-model="username"
              type="text"
              required
              placeholder="demo_user"
              class="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Password123"
              class="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <p class="text-xs text-gray-400 text-center">
            Demo: demo_user / Password123
          </p>

          <button
            type="submit"
            class="w-full rounded-xl bg-linear-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  </LoginLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import LoginLayout from '../layouts/LoginLayout.vue'
import UserIcon from '../assets/icons/user.svg'

const username = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

async function handleLogin() {
  // TODO
  // await userStore.login()
  // router.push('/')
}
</script>
