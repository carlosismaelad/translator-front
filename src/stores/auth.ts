import { defineStore } from "pinia";
import { login, register } from "../services/api";
import type { LoginCredentials, RegisterCredentials } from "../types/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async loginUser(credentials: LoginCredentials) {
      try {
        this.loading = true;
        this.error = null;
        const response = await login(credentials);
        this.token = response.token;
        localStorage.setItem("token", response.token);
        return response;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Login failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async registerUser(credentials: RegisterCredentials) {
      try {
        this.loading = true;
        this.error = null;
        const response = await register(credentials);
        return response;
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Registration failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
