<template>
  <DefaultLayout>
    <!-- Search and Filter -->
    <ProductFilter
      v-model:search-query="searchQuery"
      v-model:selected-type="selectedType"
    />

    <!-- Product Grid -->
    <ProductGrid
      :products="filteredProducts"
      :is-loading="productStore.isLoading"
      :error="productStore.error"
    />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ProductFilter from '../components/ui/ProductFilter.vue'
import ProductGrid from '../components/grids/ProductGrid.vue'
import { useProductStore } from '../store/product'
import { useBasketStore } from '../store/basket'
import type { ProductType } from '@cep/shared'

const productStore = useProductStore()
const basketStore = useBasketStore()

const searchQuery = ref('')
const selectedType = ref<ProductType | ''>('')

const filteredProducts = computed(() => {
  return productStore.products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchesType =
      !selectedType.value || product.type === selectedType.value
    return matchesSearch && matchesType
  })
})

onMounted(async () => {
  await Promise.all([productStore.fetchProducts(), basketStore.fetchBasket()])
})
</script>
