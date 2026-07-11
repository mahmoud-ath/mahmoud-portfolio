export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  intent?: string;
  source?: 'intent' | 'document' | 'fallback' | 'project';
  projectSlug?: string;
}

export interface Intent {
  id: string;
  name: string;
  keywords: string[];
  response: string;
  priority: number;
  category: 'about' | 'skills' | 'projects' | 'experience' | 'contact' | 'cv';
  icon?: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  relevance?: number;
}

export interface ChatbotConfig {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  error?: string;
}

export interface SearchResult {
  score: number;
  section: DocumentSection;
  snippet: string;
}
