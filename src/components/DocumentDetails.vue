<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <div class="bg-gray-800 rounded-lg max-w-2xl w-full p-6">
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-2xl font-bold text-white">{{ document.subject }}</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white">
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
          <h3 class="text-sm font-medium text-gray-400">Email do Autor</h3>
          <p class="mt-1 text-white">{{ document.authorEmail }}</p>
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-400">Conteúdo Original</h3>
          <p class="mt-1 text-white whitespace-pre-wrap">
            {{ document.content }}
          </p>
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-400">Conteúdo Traduzido</h3>
          <p class="mt-1 text-white whitespace-pre-wrap">
            {{ document.translatedContent }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="text-sm font-medium text-gray-400">Idioma de origem</h3>
            <p class="mt-1 text-white">{{ document.sourceLanguage }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-400">Idioma de destino</h3>
            <p class="mt-1 text-white">{{ document.targetLanguage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Document {
  id: string;
  subject: string;
  content: string;
  translatedContent: string;
  authorEmail: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatorId: string;
}

defineProps<{
  document: Document;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>
