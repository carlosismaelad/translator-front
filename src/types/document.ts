export interface Document {
  id: string;
  subject: string;
  content: string;
  translatedContent: string;
  authorEmail: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatorId: string;
}
