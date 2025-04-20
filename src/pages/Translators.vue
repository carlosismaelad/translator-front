<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
    <div class="max-w-4xl mx-auto">
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <h1 class="text-2xl sm:text-3xl font-bold">Tradutores</h1>
        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <AppButton
            @click="handleBack"
            variant="secondary"
            class="w-full sm:w-auto"
          >
            Voltar
          </AppButton>
          <AppButton
            @click="handleLogout"
            variant="secondary"
            class="w-full sm:w-auto"
          >
            Sair
          </AppButton>
          <AppButton
            @click="isNewTranslatorModalOpen = true"
            class="w-full sm:w-auto"
          >
            Novo Tradutor
          </AppButton>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>

      <div v-else-if="error" class="text-red-500 text-center p-4">
        {{ error }}
      </div>

      <div
        v-else-if="translators.length === 0"
        class="text-center text-gray-400 py-12"
      >
        Nenhum tradutor cadastrado.
      </div>

      <div v-else class="space-y-4">
        <TranslatorCard
          v-for="translator in translators"
          :key="translator.id"
          :translator="translator"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>

      <EditTranslatorModal
        v-if="showEditModal"
        :translator="translatorToEdit"
        @close="showEditModal = false"
        @update="handleUpdate"
      />

      <NewTranslatorModal
        :is-open="isNewTranslatorModalOpen"
        @close="closeNewTranslatorModal"
        @create="handleCreate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TranslatorCard from "../components/TranslatorCard.vue";
import EditTranslatorModal from "../components/EditTranslatorModal.vue";
import NewTranslatorModal from "../components/NewTranslatorModal.vue";
import AppButton from "../components/common/AppButton.vue";

const router = useRouter();

interface Translator {
  id: string;
  name: string;
  email: string;
  languages: string[];
  specialties: string[];
}

const translators = ref<Translator[]>([]);
const loading = ref(false);
const error = ref("");
const showEditModal = ref(false);
const isNewTranslatorModalOpen = ref(false);
const translatorToEdit = ref<Translator | null>(null);

const fetchTranslators = async () => {
  try {
    loading.value = true;
    error.value = "";

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    console.log("Buscando tradutores...");
    const response = await fetch(
      "https://translator-api-9gyp.onrender.com/api/translator",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao carregar tradutores");
    }

    const data = await response.json();
    console.log("Tradutores recebidos:", data);
    translators.value = data;
  } catch (err) {
    console.error("Erro ao buscar tradutores:", err);
    error.value =
      err instanceof Error
        ? err.message
        : "Ocorreu um erro ao carregar os tradutores";
  } finally {
    loading.value = false;
  }
};

const handleEdit = (translator: Translator) => {
  translatorToEdit.value = translator;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  translatorToEdit.value = null;
};

const handleUpdate = (updatedTranslator: Translator) => {
  const index = translators.value.findIndex(
    (t) => t.id === updatedTranslator.id
  );
  if (index !== -1) {
    translators.value[index] = updatedTranslator;
  }
};

const closeNewTranslatorModal = () => {
  isNewTranslatorModalOpen.value = false;
};

const handleCreate = (newTranslator: Translator) => {
  translators.value.push(newTranslator);
  closeNewTranslatorModal();
};

const handleDelete = async (translator: Translator) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(
      `https://translator-api-9gyp.onrender.com/api/translator/${translator.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao excluir tradutor");
    }

    translators.value = translators.value.filter((t) => t.id !== translator.id);
  } catch (err) {
    console.error("Erro ao excluir tradutor:", err);
    error.value =
      err instanceof Error
        ? err.message
        : "Ocorreu um erro ao excluir o tradutor";
  }
};

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(
      "https://translator-api-9gyp.onrender.com/api/auth/logout",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao fazer logout");
    }

    localStorage.removeItem("token");
    router.push("/login");
  } catch (err) {
    console.error("Erro ao fazer logout:", err);
    error.value =
      err instanceof Error ? err.message : "Ocorreu um erro ao fazer logout";
  }
};

const handleBack = () => {
  router.push("/dashboard");
};

onMounted(() => {
  console.log("Componente montado, buscando tradutores...");
  fetchTranslators();
});
</script>
