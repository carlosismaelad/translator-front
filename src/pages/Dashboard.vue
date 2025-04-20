<template>
  <div class="min-h-screen bg-black p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-primary">Translator App</h1>
          <p class="text-gray-400 mt-2">Seus documentos</p>
        </div>
        <div class="flex gap-4">
          <AppButton variant="primary" @click="showNewDocumentModal = true">
            Novo documento
          </AppButton>
          <AppButton variant="secondary" @click="router.push('/translators')">
            Tradutores
          </AppButton>
          <AppButton variant="secondary" @click="router.push('/documents')">
            CSV Upload
          </AppButton>
          <AppButton variant="secondary" @click="handleLogout">
            Sair
          </AppButton>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>

      <div
        v-else-if="error"
        class="bg-red-900/20 border border-red-500 text-white p-4 rounded-md"
      >
        {{ error }}
      </div>

      <div v-else-if="documents.length === 0" class="text-center py-12">
        <p class="text-gray-400 text-lg">
          Você ainda não possui documentos traduzidos
        </p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="document in documents"
          :key="document.id"
          class="bg-gray-800 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument(document)"
        >
          <h2 class="text-xl font-semibold text-white mb-2">
            {{ document.subject }}
          </h2>
          <p class="text-gray-400">Author: {{ document.authorEmail }}</p>
          <div class="mt-2 flex gap-2">
            <span class="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded">
              {{ document.sourceLanguage }} → {{ document.targetLanguage }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Document Details Modal -->
    <DocumentDetails
      v-if="selectedDocument"
      :document="selectedDocument"
      @close="selectedDocument = null"
    />

    <!-- New Document Modal -->
    <NewDocumentModal
      v-if="showNewDocumentModal"
      @close="handleModalClose"
      @document-created="handleDocumentCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DocumentDetails from "../components/DocumentDetails.vue";
import NewDocumentModal from "../components/NewDocumentModal.vue";
import AppButton from "../components/common/AppButton.vue";

const router = useRouter();

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

const documents = ref<Document[]>([]);
const loading = ref(true);
const error = ref("");
const selectedDocument = ref<Document | null>(null);
const showNewDocumentModal = ref(false);

const fetchDocuments = async () => {
  try {
    loading.value = true;
    error.value = "";

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(
      "https://translator-api-9gyp.onrender.com/api/document",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }

    documents.value = await response.json();
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : "An error occurred while fetching documents";
  } finally {
    loading.value = false;
  }
};

const handleModalClose = () => {
  showNewDocumentModal.value = false;
  fetchDocuments();
};

const handleDocumentCreated = () => {
  fetchDocuments();
};

const selectDocument = (document: Document) => {
  selectedDocument.value = document;
};

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
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
      throw new Error("Failed to logout");
    }

    localStorage.removeItem("token");
    router.push("/login");
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : "An error occurred while logging out";
  }
};

onMounted(() => {
  fetchDocuments();
});
</script>
