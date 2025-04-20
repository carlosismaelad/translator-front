<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary">Translator App</h1>
        <p class="text-gray-400 mt-2">Entre na sua conta</p>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 shadow-xl">
        <form @submit.prevent="handleSubmit">
          <AppInput
            label="Email"
            name="email"
            v-model="form.email"
            placeholder="Enter your email"
            :error="errors.email"
          />

          <AppInput
            label="Password"
            name="password"
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            :error="errors.password"
          />

          <div class="mt-6">
            <AppButton
              variant="blue"
              class="w-full"
              :loading="authStore.loading"
              :disabled="authStore.loading"
            >
              Login
            </AppButton>
          </div>

          <p v-if="authStore.error" class="mt-4 text-center text-red-500">
            {{ authStore.error }}
          </p>
        </form>
      </div>

      <div class="mt-6 text-center">
        <p class="text-gray-400">
          Ainda não é registrado?
          <router-link to="/register" class="text-primary hover:underline">
            registra-se
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import AppInput from "../components/common/AppInput.vue";
import AppButton from "../components/common/AppButton.vue";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const handleSubmit = async () => {
  try {
    errors.email = "";
    errors.password = "";

    await schema.validate(form, { abortEarly: false });

    await authStore.loginUser({
      email: form.email,
      password: form.password,
    });

    router.push("/dashboard");
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((error) => {
        if (error.path && error.path in errors) {
          errors[error.path as keyof typeof errors] = error.message;
        }
      });
    }
  }
};
</script>
