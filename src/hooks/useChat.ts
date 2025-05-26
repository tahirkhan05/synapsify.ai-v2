
import { useState, useCallback } from 'react';
import { ChatPanel, Message, ModelProvider } from '@/types/chat';
import { chatService } from '@/services/chatService';
import { useToast } from '@/hooks/use-toast';

export const useChat = (initialPanels: ChatPanel[], modelProviders: ModelProvider[]) => {
  const { toast } = useToast();
  const [panels, setPanels] = useState<ChatPanel[]>(initialPanels);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");

  const updatePanelCount = useCallback((count: number) => {
    if (count === panels.length) return;
    
    if (count > panels.length) {
      const newPanels = [...panels];
      while (newPanels.length < count) {
        const providerIndex = newPanels.length % modelProviders.length;
        newPanels.push({
          id: Date.now() + newPanels.length,
          provider: modelProviders[providerIndex].id,
          model: modelProviders[providerIndex].models[0],
          audience: "",
          role: "",
          messages: []
        });
      }
      setPanels(newPanels);
    } else {
      setPanels(panels.slice(0, count));
    }
  }, [panels, modelProviders]);

  const updatePanel = useCallback((updatedPanel: ChatPanel) => {
    setPanels(prevPanels => 
      prevPanels.map(p => p.id === updatedPanel.id ? updatedPanel : p)
    );
  }, []);

  const clearChat = useCallback(() => {
    const updatedPanels = panels.map(panel => ({
      ...panel,
      messages: []
    }));
    setPanels(updatedPanels);
    setSummaryContent("");
    toast({
      title: "Chat Cleared",
      description: "All conversation history has been cleared."
    });
  }, [panels, toast]);

  const sendMessage = useCallback(async (prompt: string, enableSummary: boolean) => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    
    // Add user messages to panels
    const updatedPanels = panels.map(panel => ({
      ...panel,
      messages: [...panel.messages, { role: "user" as const, content: prompt }]
    }));
    setPanels(updatedPanels);

    try {
      const response = await chatService.sendMessage({
        prompt,
        panels: updatedPanels,
        enableSummary
      });

      // Add AI responses to panels
      const panelsWithResponses = updatedPanels.map(panel => ({
        ...panel,
        messages: [...panel.messages, {
          role: "assistant" as const,
          content: response.panelResponses[panel.id] || "No response received"
        }]
      }));

      setPanels(panelsWithResponses);
      
      if (response.summary) {
        setSummaryContent(response.summary);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [panels, isGenerating, toast]);

  return {
    panels,
    isGenerating,
    summaryContent,
    updatePanelCount,
    updatePanel,
    clearChat,
    sendMessage,
    setPanels
  };
};
