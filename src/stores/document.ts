import { defineStore } from "pinia";
import { getDocuments } from "../services/api";
import type { Document } from "../types/document";

export const useDocumentStore = defineStore("document", {
  state: () => ({
    documents: [] as Document[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchDocuments() {
      try {
        this.loading = true;
        this.error = null;
        const documents = await getDocuments();
        this.documents = documents;
        return documents;
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch documents";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
