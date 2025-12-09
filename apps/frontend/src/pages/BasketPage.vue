<template>
  <DefaultLayout>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Your Basket</h1>

      <!-- Loading state -->
      <BasketSkeleton v-if="basketStore.isLoading" :count="3" />

      <!-- Error state -->
      <div v-else-if="basketStore.error" class="text-center text-red-500 py-8">
        {{ basketStore.error }}
      </div>

      <!-- Empty state -->
      <div v-else-if="basketStore.items.length === 0" class="text-center py-12">
        <p class="text-gray-500 mb-4">Your basket is empty</p>
        <router-link
          to="/"
          class="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </router-link>
      </div>

      <!-- Basket items table -->
      <div v-else class="overflow-x-auto">
        <table
          class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-900"
              >
                Product
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-900"
              >
                Type
              </th>
              <th
                class="px-4 py-3 text-center text-sm font-semibold text-gray-900"
              >
                Quantity
              </th>
              <th
                class="px-4 py-3 text-right text-sm font-semibold text-gray-900"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="item in basketStore.items" :key="item.id">
              <td class="px-4 py-3">
                <div>
                  <p class="font-medium text-gray-900">
                    {{ item.product.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ item.product.description }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-block rounded-full px-2 py-1 text-xs font-medium"
                  :class="getTypeClasses(item.product.type)"
                >
                  {{ item.product.type }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                {{ item.quantity }}
              </td>
              <td class="px-4 py-3 text-right">
                <button
                  @click="handleRemove(item.id)"
                  class="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          class="mt-4 flex justify-between items-center bg-white rounded-lg p-4 shadow-sm"
        >
          <p class="text-gray-600">
            Total items:
            <span class="font-semibold">{{ basketStore.totalQuantity }}</span>
          </p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import BasketSkeleton from '../components/skeletons/BasketSkeleton.vue'
import { useBasketStore } from '../store/basket'
import type { ProductType } from '@cep/shared'

const basketStore = useBasketStore()

function getTypeClasses(type: ProductType): string {
  switch (type) {
    case 'Books':
      return 'bg-blue-100 text-blue-700'
    case 'Music':
      return 'bg-purple-100 text-purple-700'
    case 'Games':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function handleRemove(basketId: number) {
  basketStore.removeFromCart(basketId)
}

onMounted(async () => {
  await basketStore.fetchBasket()
})
</script>
