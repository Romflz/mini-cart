<template>
  <div
    class="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300"
  >
    <!-- Type badge -->
    <span
      class="absolute -top-2 left-4 inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
      :class="typeClasses"
    >
      {{ product.type }}
    </span>

    <!-- Content -->
    <div class="mt-3 flex-1">
      <h3
        class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors"
      >
        {{ product.name }}
      </h3>
      <p class="mt-2 text-sm text-gray-500 line-clamp-2">
        {{ product.description }}
      </p>
    </div>

    <!-- Add to cart -->
    <div class="mt-5 flex items-center gap-3 pt-4 border-t border-gray-100">
      <div
        class="flex items-center rounded-lg border border-gray-200 bg-gray-50"
      >
        <button
          @click="decrementQty"
          :disabled="isInCart || quantity <= 1"
          class="px-2.5 py-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          −
        </button>
        <input
          v-model.number="quantity"
          type="number"
          min="1"
          :disabled="isInCart"
          class="w-10 border-0 bg-transparent py-1.5 text-center text-sm font-medium focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          @click="incrementQty"
          :disabled="isInCart"
          class="px-2.5 py-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
      <button
        @click="handleAddToCart"
        :disabled="isInCart"
        class="flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
        :class="
          isInCart
            ? 'bg-green-50 text-green-600 cursor-default'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
        "
      >
        {{ isInCart ? '✓ In Cart' : 'Add to Cart' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@cep/shared'
import { useBasketStore } from '../../store/basket'

const props = defineProps<{
  product: Product
}>()

const basketStore = useBasketStore()

const quantity = ref(1)

const isInCart = computed(() => basketStore.isInCart(props.product.id))

const typeClasses = computed(() => {
  switch (props.product.type) {
    case 'Books':
      return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
    case 'Music':
      return 'bg-purple-100 text-purple-700 ring-1 ring-purple-200'
    case 'Games':
      return 'bg-green-100 text-green-700 ring-1 ring-green-200'
    default:
      return 'bg-gray-100 text-gray-700 ring-1 ring-gray-200'
  }
})

function incrementQty() {
  quantity.value++
}

function decrementQty() {
  if (quantity.value > 1) quantity.value--
}

async function handleAddToCart() {
  const success = await basketStore.addToCart(props.product.id, quantity.value)
  if (!success) {
    alert('This product has already been added to your basket.')
  }
  quantity.value = 1
}
</script>
