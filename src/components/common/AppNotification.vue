<template>
  <Transition name="slide-fade">
    <div
      v-if="show"
      :class="[
        'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50',
        isSuccess ? 'bg-green-500' : 'bg-orange-500',
      ]"
    >
      <p class="text-white">{{ message }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  message: string;
  isSuccess: boolean;
  duration?: number;
}>();

const show = ref(true);

watch(
  () => props.message,
  () => {
    show.value = true;
    if (props.duration) {
      setTimeout(() => {
        show.value = false;
      }, props.duration);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
