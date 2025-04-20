<template>
  <div class="card">
    <div class="mb-3">
      <h3 class="text-xl font-semibold mb-1 text-primary">{{ document.subject }}</h3>
      <p class="text-sm text-gray-400">Author: {{ document.authorEmail }}</p>
      <div class="flex gap-2 mt-2">
        <span class="px-2 py-1 bg-gray-700 rounded-md text-xs">{{ document.sourceLanguage }} → {{ document.targetLanguage }}</span>
      </div>
    </div>
    
    <div class="mt-4 space-y-3">
      <div>
        <h4 class="text-sm font-medium text-gray-400 mb-1">Original Content:</h4>
        <p class="text-white bg-gray-900 p-3 rounded-md text-sm">{{ document.content }}</p>
      </div>
      
      <div>
        <h4 class="text-sm font-medium text-gray-400 mb-1">Translated Content:</h4>
        <p class="text-white bg-gray-900 p-3 rounded-md text-sm">{{ document.translatedContent }}</p>
      </div>
    </div>
    
    <div class="mt-4 text-xs text-gray-500">
      <p>ID: {{ document.id }}</p>
      <p>Translator ID: {{ document.translatorId }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Document } from '../../types/document';

defineProps({
  document: {
    type: Object as () => Document,
    required: true
  }
});
</script>