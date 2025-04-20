<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    :class="[
      'px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md font-medium transition-colors',
      variant === 'primary'
        ? 'bg-primary text-white hover:bg-primary/90'
        : 'bg-gray-700 text-white hover:bg-gray-600',
      loading ? 'opacity-75 cursor-not-allowed' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
  >
    <div v-if="loading" class="flex items-center justify-center">
      <div
        class="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-b-2 border-white mr-2"
      ></div>
      <span>Carregando...</span>
    </div>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}>();
</script>
