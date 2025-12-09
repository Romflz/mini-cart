<template>
  <div
    v-for="i in count"
    :key="i"
    class="relative animate-pulse rounded-xl border border-gray-200 bg-white p-5"
  >
    <!-- Badge skeleton -->
    <div class="absolute -top-2 left-4 h-6 w-14 rounded-full bg-gray-200"></div>

    <!-- Content skeleton -->
    <div class="mt-4">
      <div class="h-6 w-3/4 rounded bg-gray-200"></div>
      <div class="mt-3 h-4 w-full rounded bg-gray-200"></div>
      <div class="mt-1 h-4 w-2/3 rounded bg-gray-200"></div>
    </div>

    <!-- Add to cart skeleton -->
    <div class="mt-5 flex gap-3 border-t border-gray-100 pt-4">
      <div class="h-10 w-24 rounded-lg bg-gray-200"></div>
      <div class="h-10 flex-1 rounded-lg bg-gray-200"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 6,
  }
)
</script>
