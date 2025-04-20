import axios from "axios";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth";
import type { Document } from "../types/document";
import { AxiosResponse } from "axios";

const API_URL = "https://translator-api-9gyp.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Falha no login");
  }
};

export const register = async (
  credentials: RegisterCredentials
): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>(
    "/auth/register",
    credentials
  );
  return response.data;
};

export const getDocuments = async (): Promise<Document[]> => {
  const response = await api.get<Document[]>("/auth/document");
  return response.data;
};

export default api;
