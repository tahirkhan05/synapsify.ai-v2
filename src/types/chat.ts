
export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatPanel {
  id: number;
  provider: string;
  model: string;
  audience: string;
  role: string;
  messages: Message[];
}

export interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
}

export interface ModelProvider {
  id: string;
  name: string;
  models: string[];
}

export interface ChatRequest {
  prompt: string;
  panels: ChatPanel[];
  enableSummary: boolean;
  fileUpload?: File;
}

export interface ChatResponse {
  panelResponses: { [panelId: number]: string };
  summary?: string;
}
