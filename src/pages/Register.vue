<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary">Translator App</h1>
        <p class="text-gray-400 mt-2">Crie sua conta</p>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 shadow-xl">
        <form @submit.prevent="handleSubmit">
          <AppInput
            label="Name"
            name="name"
            v-model="formData.name"
            placeholder="Enter your name"
            :error="errors.name"
          />

          <AppInput
            label="Email"
            name="email"
            v-model="formData.email"
            placeholder="Enter your email"
            :error="errors.email"
          />

          <AppInput
            label="Password"
            name="password"
            type="password"
            v-model="formData.password"
            placeholder="Enter your password"
            :error="errors.password"
          />

          <AppInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            v-model="formData.confirmPassword"
            placeholder="Confirm your password"
            :error="errors.confirmPassword"
          />

          <div class="mt-6">
            <AppButton
              variant="primary"
              class="w-full"
              :loading="loading"
              :disabled="loading"
            >
              Register
            </AppButton>
          </div>
        </form>
      </div>

      <div class="mt-6 text-center">
        <p class="text-gray-400">
          Already have an account?
          <router-link to="/login" class="text-primary hover:underline">
            Login
          </router-link>
        </p>
      </div>
    </div>

    <AppNotification
      v-if="notification.message"
      :message="notification.message"
      :is-success="notification.isSuccess"
      :duration="4000"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppInput from "../components/common/AppInput.vue";
import AppButton from "../components/common/AppButton.vue";
import AppNotification from "../components/common/AppNotification.vue";

const router = useRouter();
const loading = ref(false);
const errors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const notification = ref({
  message: "",
  isSuccess: false,
});

const formData = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleSubmit = async () => {
  Object.keys(errors.value).forEach((key) => {
    errors.value[key as keyof typeof errors.value] = "";
  });

  if (formData.value.password !== formData.value.confirmPassword) {
    notification.value = {
      message: "Passwords do not match",
      isSuccess: false,
    };
    return;
  }

  try {
    loading.value = true;
    const response = await fetch(
      "https://translator-api-9gyp.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.value.name,
          email: formData.value.email,
          password: formData.value.password,
          confirmPassword: formData.value.confirmPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      notification.value = {
        message: data.message,
        isSuccess: true,
      };
      setTimeout(() => {
        router.push("/login");
      }, 4000);
    } else {
      throw new Error(data.message || "Registration failed");
    }
  } catch (err) {
    notification.value = {
      message:
        err instanceof Error
          ? err.message
          : "An error occurred during registration",
      isSuccess: false,
    };
  } finally {
    loading.value = false;
  }
};
</script>
