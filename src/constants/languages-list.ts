export interface Language {
  name: string;
  code: string;
}

export const languages: Language[] = [
  { name: "Português (Brasil)", code: "pt-BR" },
  { name: "Inglês (Estados Unidos)", code: "en-US" },
  { name: "Inglês (Reino Unido)", code: "en-GB" },
  { name: "Espanhol (Espanha)", code: "es-ES" },
  { name: "Espanhol (México)", code: "es-MX" },
  { name: "Francês (França)", code: "fr-FR" },
  { name: "Alemão (Alemanha)", code: "de-DE" },
  { name: "Italiano (Itália)", code: "it-IT" },
  { name: "Japonês (Japão)", code: "ja-JP" },
  { name: "Chinês (Simplificado)", code: "zh-CN" },
  { name: "Chinês (Tradicional)", code: "zh-TW" },
  { name: "Coreano (Coreia do Sul)", code: "ko-KR" },
  { name: "Russo (Rússia)", code: "ru-RU" },
  { name: "Árabe (Arábia Saudita)", code: "ar-SA" },
  { name: "Hindi (Índia)", code: "hi-IN" },
];
