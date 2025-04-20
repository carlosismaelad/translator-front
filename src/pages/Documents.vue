<template>
  <div class="min-h-screen bg-black p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-primary">Translator App</h1>
          <p class="text-gray-400 mt-2">Upload de Documentos CSV</p>
        </div>
        <div class="flex gap-4">
          <AppButton variant="secondary" @click="router.push('/dashboard')">
            Voltar
          </AppButton>
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">
          Novo Documento CSV
        </h2>

        <div class="mb-6">
          <p class="text-sm text-gray-400 mb-2">
            Atenção: o CSV de tradutores deve conter colunas seguindo o padrão
            nome, email, idioma de origem (caso esteja em branco será
            determinado pelo sistema) e idioma de destino
          </p>
          <input
            type="file"
            accept=".csv"
            @change="handleTranslatorsFile"
            class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>

        <div class="mb-6">
          <p class="text-sm text-gray-400 mb-2">
            O CSV documentos deve seguir o padrão de colunas assunto, conteúdo,
            localidade e email do autor
          </p>
          <input
            type="file"
            accept=".csv"
            @change="handleDocumentsFile"
            class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>

        <div class="flex justify-end gap-4">
          <AppButton variant="secondary" @click="router.push('/dashboard')">
            Cancelar
          </AppButton>
          <AppButton
            variant="primary"
            @click="uploadCsvFiles"
            :disabled="!translatorsFile || !documentsFile"
          >
            Enviar
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import AppButton from "../components/common/AppButton.vue";

const router = useRouter();
const translatorsFile = ref<File | null>(null);
const documentsFile = ref<File | null>(null);

const handleTranslatorsFile = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    translatorsFile.value = input.files[0];
  }
};

const handleDocumentsFile = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    documentsFile.value = input.files[0];
  }
};

const uploadCsvFiles = async () => {
  if (!translatorsFile.value || !documentsFile.value) return;

  const formData = new FormData();
  formData.append("translatorsCsv", translatorsFile.value);
  formData.append("documentsCsv", documentsFile.value);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axios.post(
      "https://translator-api-9gyp.onrender.com/api/document/csv/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      alert("Arquivos CSV enviados com sucesso!");
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("Erro ao enviar arquivos CSV:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert("Sua sessão expirou. Por favor, faça login novamente.");
        router.push("/login");
      } else if (error.response?.status === 500) {
        alert(
          "Erro no servidor ao processar os arquivos CSV. Por favor, verifique o formato dos arquivos e tente novamente."
        );
      } else {
        alert(
          `Erro ao enviar os arquivos CSV: ${
            error.response?.data?.message || "Erro desconhecido"
          }`
        );
      }
    } else {
      alert("Erro ao enviar os arquivos CSV. Por favor, tente novamente.");
    }
  }
};
</script>
