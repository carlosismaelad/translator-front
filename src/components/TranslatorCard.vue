<template>
  <div
    class="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold text-white mb-2">
          {{ translator.name }}
        </h3>
        <p class="text-gray-400 mb-4">{{ translator.email }}</p>
      </div>
      <div class="flex space-x-2">
        <button
          @click="$emit('edit', translator)"
          class="text-gray-400 hover:text-white transition-colors"
          title="Editar tradutor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          @click="$emit('delete', translator)"
          class="text-gray-400 hover:text-red-500 transition-colors"
          title="Excluir tradutor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="space-y-3">
      <div>
        <h4 class="text-sm font-medium text-gray-400 mb-1">Idiomas</h4>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="language in translator.languages"
            :key="language"
            class="px-2 py-1 bg-gray-700 text-white text-sm rounded-full"
          >
            {{ language }}
          </span>
        </div>
      </div>
      <div>
        <h4 class="text-sm font-medium text-gray-400 mb-1">Especialidades</h4>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="specialty in translator.specialties"
            :key="specialty"
            class="px-2 py-1 bg-gray-700 text-white text-sm rounded-full"
          >
            {{ specialty }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  translator: {
    id: string;
    name: string;
    email: string;
    languages: string[];
    specialties: string[];
  };
}>();

defineEmits<{
  (e: "edit", translator: any): void;
  (e: "delete", translator: any): void;
}>();
</script>
