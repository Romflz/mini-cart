<template>
  <div class="space-y-4">
    <div
      v-for="i in count"
      :key="i"
      class="animate-pulse flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4"
    >
      <div class="h-5 w-20 rounded bg-gray-200"></div>
      <div class="flex-1 h-5 rounded bg-gray-200"></div>
      <div class="h-5 w-16 rounded bg-gray-200"></div>
      <div class="h-8 w-20 rounded bg-gray-200"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 3,
  }
)
</script>
