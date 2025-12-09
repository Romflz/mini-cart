import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SafeUser } from '@cep/shared'

const TOKEN_KEY = 'jwt'

interface AuthResponse {
  token: string
  user: SafeUser
}

interface MeResponse {
  user: SafeUser
}

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const isLoading = ref(true)
  const username = ref<string | null>(null)

  async function init() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      isLoading.value = false
      return
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const data: MeResponse = await res.json()
        username.value = data.user.loginName
        isLoggedIn.value = true
      } else {
        localStorage.removeItem(TOKEN_KEY)
      }
    } catch {
      localStorage.removeItem(TOKEN_KEY)
    } finally {
      isLoading.value = false
    }
  }

  async function login(loginName: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginName, password }),
    })

    if (!res.ok) {
      throw new Error('Login failed')
    }

    const data: AuthResponse = await res.json()
    localStorage.setItem(TOKEN_KEY, data.token)
    username.value = data.user.loginName
    isLoggedIn.value = true
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    username.value = null
    isLoggedIn.value = false
  }

  return {
    isLoggedIn,
    isLoading,
    username,
    init,
    login,
    logout,
  }
})
