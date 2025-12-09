import { defineStore } from 'pinia'
import { ref } from 'vue'

const TOKEN_KEY = 'jwt'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const isLoading = ref(true)

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

  async function login(username: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      throw new Error('Login failed')
    }

    const data = await res.json()
    localStorage.setItem(TOKEN_KEY, data.token)
    isLoggedIn.value = true
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    isLoggedIn.value = false
  }

  return {
    isLoggedIn,
    isLoading,
    init,
    login,
    logout,
  }
})
