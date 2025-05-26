
import { ChatRequest, ChatResponse, ChatPanel } from '@/types/chat';

class ChatService {
  private baseUrl = process.env.VITE_API_URL || 'http://localhost:8000';

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    // This will be replaced with actual API call to your Python backend
    // For now, return mock data to maintain current functionality
    return this.mockChatResponse(request);
  }

  async uploadFile(file: File): Promise<string> {
    // This will be replaced with actual file upload to your backend
    console.log('File upload would be handled here:', file.name);
    return Promise.resolve('mock-file-id');
  }

  async generateSummary(responses: { [key: string]: string }): Promise<string> {
    // This will be replaced with actual summary generation from your backend
    return Promise.resolve('Mock summary of responses from different models.');
  }

  private async mockChatResponse(request: ChatRequest): Promise<ChatResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const panelResponses: { [panelId: number]: string } = {};
    
    request.panels.forEach(panel => {
      panelResponses[panel.id] = `Mock response from ${panel.provider} using ${panel.model}.${panel.audience ? ` Audience: ${panel.audience}.` : ''}${panel.role ? ` Role: ${panel.role}.` : ''}`;
    });

    const summary = request.enableSummary && request.panels.length > 1 
      ? 'Mock summary comparing responses from different models.'
      : undefined;

    return { panelResponses, summary };
  }
}

export const chatService = new ChatService();
