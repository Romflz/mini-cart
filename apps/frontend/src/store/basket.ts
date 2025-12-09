import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BasketItem } from '@cep/shared'

export const useBasketStore = defineStore('basket', () => {
  const items = ref<BasketItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const itemCount = computed(() => items.value.length)
  const totalQuantity = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  function isInCart(productId: number): boolean {
    return items.value.some(item => item.productId === productId)
  }

  async function fetchBasket() {
    isLoading.value = true
    error.value = null

    try {
      const token = localStorage.getItem('jwt')
      const res = await fetch('/api/basket', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error('Failed to fetch basket')

      const data = await res.json()
      items.value = data.items
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch basket'
    } finally {
      isLoading.value = false
    }
  }

  async function addToCart(
    productId: number,
    quantity: number
  ): Promise<boolean> {
    if (isInCart(productId)) {
      return false
    }

    try {
      const token = localStorage.getItem('jwt')
      const res = await fetch('/api/basket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.error === 'Product already in basket') {
          return false
        }
        throw new Error('Failed to add to cart')
      }

      // Refetch basket
      await fetchBasket()
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to add to cart'
      return false
    }
  }

  async function removeFromCart(basketId: number) {
    try {
      const token = localStorage.getItem('jwt')
      const res = await fetch(`/api/basket/${basketId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error('Failed to remove from cart')

      // Refetch basket
      await fetchBasket()
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Failed to remove from cart'
    }
  }

  function $reset() {
    items.value = []
    error.value = null
    isLoading.value = false
  }

  return {
    items,
    isLoading,
    error,
    itemCount,
    totalQuantity,
    isInCart,
    fetchBasket,
    addToCart,
    removeFromCart,
    $reset,
  }
})
