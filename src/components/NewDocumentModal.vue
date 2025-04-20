<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">
          Novo Documento - escrita livre
        </h2>
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

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-gray-300 mb-2">Assunto</label>
          <AppInput
            v-model="form.subject"
            placeholder="Digite o assunto do documento"
            required
          />
        </div>

        <div>
          <label class="block text-gray-300 mb-2">Conteúdo</label>
          <AppInput
            v-model="form.content"
            type="textarea"
            placeholder="Digite o conteúdo do documento"
            required
          />
        </div>

        <div>
          <label class="block text-gray-300 mb-2">Email do Autor</label>
          <AppInput
            v-model="form.authorEmail"
            type="email"
            placeholder="Digite o email do autor"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-300 mb-2">Idioma de Origem</label>
            <div class="relative">
              <AppInput
                v-model="sourceLanguageSearch"
                @click="showSourceLanguages = !showSourceLanguages"
                @input="filterSourceLanguages"
                placeholder="Digite para buscar o idioma"
                required
              />
              <div
                v-if="showSourceLanguages"
                class="absolute z-10 w-full mt-1 bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                <div
                  v-for="lang in filteredSourceLanguages"
                  :key="lang.code"
                  @click="selectSourceLanguage(lang)"
                  class="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
                >
                  {{ lang.name }}
                </div>
                <div
                  v-if="filteredSourceLanguages.length === 0"
                  class="px-4 py-2 text-gray-400"
                >
                  Nenhum idioma encontrado
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-gray-300 mb-2">Idioma de Destino</label>
            <div class="relative">
              <AppInput
                v-model="targetLanguageSearch"
                @click="showTargetLanguages = !showTargetLanguages"
                @input="filterTargetLanguages"
                placeholder="Digite para buscar o idioma"
                required
              />
              <div
                v-if="showTargetLanguages"
                class="absolute z-10 w-full mt-1 bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                <div
                  v-for="lang in filteredTargetLanguages"
                  :key="lang.code"
                  @click="selectTargetLanguage(lang)"
                  class="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
                >
                  {{ lang.name }}
                </div>
                <div
                  v-if="filteredTargetLanguages.length === 0"
                  class="px-4 py-2 text-gray-400"
                >
                  Nenhum idioma encontrado
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-4">
          <AppButton type="button" variant="secondary" @click="$emit('close')">
            Cancelar
          </AppButton>
          <AppButton type="submit" variant="primary" :loading="loading">
            Salvar
          </AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AppInput from "./common/AppInput.vue";
import AppButton from "./common/AppButton.vue";
import { languages, type Language } from "../constants/languages-list";

const emit = defineEmits(["document-created", "close"]);

const form = ref({
  subject: "",
  content: "",
  authorEmail: "",
  sourceLanguage: "",
  targetLanguage: "",
});

const sourceLanguageSearch = ref("");
const targetLanguageSearch = ref("");

const loading = ref(false);
const showSourceLanguages = ref(false);
const showTargetLanguages = ref(false);

const filteredSourceLanguages = computed(() => {
  if (!sourceLanguageSearch.value) return languages;
  const searchTerm = sourceLanguageSearch.value.toLowerCase();
  return languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm)
  );
});

const filteredTargetLanguages = computed(() => {
  if (!targetLanguageSearch.value) return languages;
  const searchTerm = targetLanguageSearch.value.toLowerCase();
  return languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm)
  );
});

const filterSourceLanguages = () => {
  showSourceLanguages.value = true;
};

const filterTargetLanguages = () => {
  showTargetLanguages.value = true;
};

const selectSourceLanguage = (lang: Language) => {
  form.value.sourceLanguage = lang.code;
  sourceLanguageSearch.value = lang.name;
  showSourceLanguages.value = false;
};

const selectTargetLanguage = (lang: Language) => {
  form.value.targetLanguage = lang.code;
  targetLanguageSearch.value = lang.name;
  showTargetLanguages.value = false;
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(
      "https://translator-api-9gyp.onrender.com/api/document/translate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create document");
    }

    // Reset form
    form.value = {
      subject: "",
      content: "",
      authorEmail: "",
      sourceLanguage: "",
      targetLanguage: "",
    };
    sourceLanguageSearch.value = "";
    targetLanguageSearch.value = "";

    emit("document-created");
    emit("close");
  } catch (err) {
    console.error("Error creating document:", err);
  } finally {
    loading.value = false;
  }
};
</script>
