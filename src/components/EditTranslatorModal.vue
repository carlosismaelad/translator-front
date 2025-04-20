<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-white">Editar Tradutor</h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1"
            >Nome</label
          >
          <AppInput
            v-model="formData.name"
            type="text"
            placeholder="Nome do tradutor"
            required
            name="name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1"
            >Email</label
          >
          <AppInput
            v-model="formData.email"
            type="email"
            placeholder="Email do tradutor"
            required
            name="email"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1"
            >Senha</label
          >
          <AppInput
            v-model="formData.password"
            type="password"
            placeholder="Nova senha"
            name="password"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1"
            >Confirmar Senha</label
          >
          <AppInput
            v-model="formData.confirmPassword"
            type="password"
            placeholder="Confirmar nova senha"
            name="confirmPassword"
          />
        </div>

        <div class="flex justify-end space-x-3">
          <AppButton type="button" variant="secondary" @click="$emit('close')">
            Cancelar
          </AppButton>
          <AppButton type="submit" :loading="isLoading"> Salvar </AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AppInput from "./common/AppInput.vue";
import AppButton from "./common/AppButton.vue";

const props = defineProps<{
  isOpen: boolean;
  translator: {
    id: string;
    name: string;
    email: string;
  };
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update", data: any): void;
}>();

const isLoading = ref(false);
const formData = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

watch(
  () => props.translator,
  (newTranslator) => {
    if (newTranslator) {
      formData.value = {
        name: newTranslator.name,
        email: newTranslator.email,
        password: "",
        confirmPassword: "",
      };
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  try {
    if (formData.value.password !== formData.value.confirmPassword) {
      throw new Error("As senhas não coincidem");
    }

    isLoading.value = true;
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://translator-api-9gyp.onrender.com/api/translator/${props.translator.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.value.name,
          email: formData.value.email,
          password: formData.value.password,
          confirmPassword: formData.value.confirmPassword,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar tradutor");
    }

    const data = await response.json();
    emit("update", data);
    emit("close");
  } catch (error) {
    console.error("Erro ao atualizar tradutor:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
