import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@cep/shared'

interface ProductsResponse {
  products: Product[]
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts() {
    isLoading.value = true
    error.value = null

    try {
      const token = localStorage.getItem('jwt')
      const res = await fetch('/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch products')
      }

      const data: ProductsResponse = await res.json()
      products.value = data.products
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
  }
})
