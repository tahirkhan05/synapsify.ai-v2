
import { useState, useRef, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Panel {
  id: number;
  provider: string;
  model: string;
  audience: string;
  role: string;
  messages: Message[];
}

interface ModelProvider {
  id: string;
  name: string;
  models: string[];
}

interface ChatPanelProps {
  panel: Panel;
  modelProviders: ModelProvider[];
  isGenerating: boolean;
  onUpdate: (panel: Panel) => void;
}

export const ChatPanel = ({ 
  panel, 
  modelProviders, 
  isGenerating, 
  onUpdate 
}: ChatPanelProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [panel.messages]);

  const handleProviderChange = (value: string) => {
    const provider = modelProviders.find(p => p.id === value);
    if (provider) {
      onUpdate({
        ...panel,
        provider: value,
        model: provider.models[0]
      });
    }
  };

  const handleModelChange = (value: string) => {
    onUpdate({
      ...panel,
      model: value
    });
  };

  const handleAudienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...panel,
      audience: e.target.value
    });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...panel,
      role: e.target.value
    });
  };

  const selectedProvider = modelProviders.find(p => p.id === panel.provider);

  return (
    <Card className="h-[600px] flex flex-col bg-card border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5" />
            {selectedProvider?.name || "AI Model"}
          </CardTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
          <Select
            value={panel.provider}
            onValueChange={handleProviderChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              {modelProviders.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={panel.model}
            onValueChange={handleModelChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {selectedProvider?.models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
          <Input
            placeholder="Audience (optional)"
            value={panel.audience}
            onChange={handleAudienceChange}
            className="w-full"
          />
          <Input
            placeholder="Role (optional)"
            value={panel.role}
            onChange={handleRoleChange}
            className="w-full"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto pb-4">
        <div className="space-y-4 h-full">
          {panel.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-foreground/40">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            panel.messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))
          )}
          {isGenerating && panel.messages.length > 0 && panel.messages[panel.messages.length - 1].role === 'user' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
    </Card>
  );
};
