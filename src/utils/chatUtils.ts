
import { ModelProvider } from '@/types/chat';

export const getGridLayoutClass = (panelLayout: 1 | 2 | 3 | 4) => {
  switch (panelLayout) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-1 lg:grid-cols-2';
    default:
      return 'grid-cols-1 lg:grid-cols-2';
  }
};

export const getDefaultModelProviders = (): ModelProvider[] => [
  { 
    id: "openai", 
    name: "ChatGPT", 
    models: ["gpt-4.1-nano", "gpt-4.1-mini", "gpt-4o-mini"] 
  },
  { 
    id: "deepseek", 
    name: "DeepSeek", 
    models: ["deepseek-chat", "deepseek-r1", "deepseek-r1-zero"] 
  },
  { 
    id: "google", 
    name: "Gemini", 
    models: ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-2.5-flash"] 
  },
  { 
    id: "meta", 
    name: "Llama", 
    models: ["llama-4-maverick", "llama-4-scout", "llama-3.3-70b"] 
  },
  { 
    id: "mistral", 
    name: "Mistral", 
    models: ["mistral-small", "pixtral-12b", "open-mistral"] 
  },
  { 
    id: "qwen", 
    name: "Qwen", 
    models: ["qwen3-235b", "qwen3-16b", "qwen2.5-vl-72b"] 
  }
];
