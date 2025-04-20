<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">Detalhes do Tradutor</h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-gray-300 mb-2">Nome</label>
          <p class="text-white">{{ translator.name }}</p>
        </div>

        <div>
          <label class="block text-gray-300 mb-2">Email</label>
          <p class="text-white">{{ translator.email }}</p>
        </div>

        <div>
          <label class="block text-gray-300 mb-2">ID</label>
          <p class="text-white">{{ translator.id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Translator {
  id: string;
  name: string;
  email: string;
}

defineProps<{
  translator: Translator;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>
