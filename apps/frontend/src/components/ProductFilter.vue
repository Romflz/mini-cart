<template>
  <div class="mb-6 flex flex-col gap-4 sm:flex-row">
    <input
      :value="searchQuery"
      @input="
        $emit('update:searchQuery', ($event.target as HTMLInputElement).value)
      "
      type="text"
      placeholder="Search by name..."
      class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <select
      :value="selectedType"
      @change="
        $emit(
          'update:selectedType',
          ($event.target as HTMLSelectElement).value as ProductType | ''
        )
      "
      class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      <option value="">All Types</option>
      <option value="Books">Books</option>
      <option value="Music">Music</option>
      <option value="Games">Games</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { ProductType } from '@cep/shared'

defineProps<{
  searchQuery: string
  selectedType: ProductType | ''
}>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedType': [value: ProductType | '']
}>()
</script>
