<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Skeleton loading -->
    <ProductCardSkeleton v-if="isLoading" :count="6" />

    <!-- Error state -->
    <div
      v-else-if="error"
      class="col-span-full rounded-lg bg-red-50 p-6 text-center text-red-600"
    >
      <p class="font-medium">{{ error }}</p>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="products.length === 0"
      class="col-span-full rounded-lg bg-gray-50 p-12 text-center"
    >
      <p class="text-lg text-gray-500">No products found</p>
      <p class="mt-1 text-sm text-gray-400">
        Try adjusting your search or filter
      </p>
    </div>

    <!-- Products -->
    <ProductCard
      v-else
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@cep/shared'
import ProductCard from './cards/ProductCard.vue'
import ProductCardSkeleton from './skeletons/ProductCardSkeleton.vue'

defineProps<{
  products: Product[]
  isLoading: boolean
  error: string | null
}>()
</script>
