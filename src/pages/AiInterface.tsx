import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Download,
  FileUp,
  Mic,
  Send,
  RefreshCw,
  X,
  Home,
  Copy,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatPanel } from "@/components/ChatPanel";
import { ChatSidebar } from "@/components/ChatSidebar";
import { PanelToggle } from "@/components/PanelToggle";
import { useToast } from "@/hooks/use-toast";

// Mock data for model providers
const modelProviders = [
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

const AiInterface = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [enableSummary, setEnableSummary] = useState(true);
  const [panelLayout, setPanelLayout] = useState<1|2|3|4>(1);
  const [panelCount, setPanelCount] = useState(1);
  const [panels, setPanels] = useState([
    { id: 1, provider: "openai", model: "gpt-4.1-nano", audience: "", role: "", messages: [] }
  ]);
  const [summaryContent, setSummaryContent] = useState("");

  const handleUpdatePanelCount = (count: number) => {
    if (count === panels.length) return;
    
    if (count > panels.length) {
      // Add panels
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
      // Remove panels
      setPanels(panels.slice(0, count));
    }
    
    setPanelCount(count);
    setPanelLayout(count as 1|2|3|4);
  };

  const handleLayoutChange = (layout: 1|2|3|4) => {
    setPanelLayout(layout);
    if (layout !== panelCount) {
      handleUpdatePanelCount(layout);
    }
  };

  const handleClearChat = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (isGenerating) return;

    setIsGenerating(true);
    
    // Simulate the API call and response for each panel
    const updatedPanels = panels.map(panel => {
      const newMessage = {
        role: "user" as const,
        content: prompt
      };
      
      // Add user message to panel
      const updatedMessages = [...panel.messages, newMessage];
      
      return {
        ...panel,
        messages: updatedMessages
      };
    });
    
    setPanels(updatedPanels);
    
    // Wait for AI "responses" - simulate delay
    setTimeout(() => {
      const panelsWithResponses = updatedPanels.map(panel => {
        const aiMessage = {
          role: "assistant" as const,
          content: `This is a simulated response from ${modelProviders.find(p => p.id === panel.provider)?.name} using the ${panel.model} model. In a real implementation, this would be the actual response from the AI API.${panel.audience ? ` Audience: ${panel.audience}.` : ''}${panel.role ? ` Role: ${panel.role}.` : ''}`
        };
        
        return {
          ...panel,
          messages: [...panel.messages, aiMessage]
        };
      });
      
      setPanels(panelsWithResponses);
      
      // Generate summary if enabled and we have multiple panels
      if (enableSummary && panels.length > 1) {
        setSummaryContent("This is a simulated summary comparing the responses from different models. In a real implementation, this would analyze similarities and differences between the various AI responses.");
      }
      
      setIsGenerating(false);
    }, 1500);
    
    setPrompt("");
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File upload functionality would be connected to the backend here."
    });
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice recording functionality would be connected to the backend here."
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Conversation",
      description: "Conversation export functionality would be implemented here."
    });
  };

  const handleCopySummary = () => {
    if (summaryContent) {
      navigator.clipboard.writeText(summaryContent);
      toast({
        title: "Summary Copied",
        description: "The summary has been copied to your clipboard."
      });
    }
  };

  const getGridLayoutClass = () => {
    switch (panelLayout) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 lg:grid-cols-2';
      case 3:
        return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
      case 4:
        return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-4';
      default:
        return 'grid-cols-1';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-background via-background to-primary/5">
        <ChatSidebar />
        
        <SidebarInset className="flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="h-8 w-8 text-foreground/60 hover:text-foreground hover:bg-secondary/80 rounded-md transition-all duration-200" />
              
              <div className="flex items-center gap-3 flex-1">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-xl text-foreground">Synapsify</span>
              </div>
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleClearChat}
                        className="h-9 w-9 hover:bg-secondary/80 transition-colors"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear chat history</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleDownload}
                        className="h-9 w-9 hover:bg-secondary/80 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download conversation</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Link to="/">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-9 w-9 hover:bg-secondary/80 transition-colors"
                        >
                          <Home className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Back to home</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-6">
              {/* Controls Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <PanelToggle
                    panelCount={panelCount}
                    onPanelCountChange={handleUpdatePanelCount}
                    layout={panelLayout}
                    onLayoutChange={handleLayoutChange}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="summary-mode" 
                      checked={enableSummary} 
                      onCheckedChange={setEnableSummary} 
                    />
                    <Label htmlFor="summary-mode" className="text-sm font-medium">
                      Enable summary
                    </Label>
                  </div>
                </div>
              </div>

              {/* Panels Section */}
              <div className="mb-6">
                <div className={`grid gap-6 ${getGridLayoutClass()}`}>
                  <AnimatePresence>
                    {panels.map((panel) => (
                      <motion.div
                        key={panel.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChatPanel
                          panel={panel}
                          modelProviders={modelProviders}
                          isGenerating={isGenerating}
                          onUpdate={(updatedPanel) => {
                            const updatedPanels = panels.map(p => 
                              p.id === updatedPanel.id ? updatedPanel : p
                            );
                            setPanels(updatedPanels);
                          }}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Summary Section */}
              {enableSummary && summaryContent && panels.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <Card className="border bg-background/60 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-foreground">Summary</h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={handleCopySummary}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy summary</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-foreground/80">{summaryContent}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </main>

          {/* Input Form */}
          <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <div className="flex-none">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={handleFileUpload}
                          className="h-10 w-10 hover:bg-secondary/80"
                        >
                          <FileUp className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Upload a file</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="flex-none">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={handleVoiceInput}
                          className="h-10 w-10 hover:bg-secondary/80"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Voice input</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="flex-1">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Message Synapsify..."
                    className="w-full h-12 rounded-xl bg-background/50 text-base px-4"
                    disabled={isGenerating}
                  />
                </div>
                
                <div className="flex-none">
                  <Button 
                    type="submit" 
                    variant="default" 
                    size="icon"
                    disabled={isGenerating || !prompt.trim()}
                    className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90"
                  >
                    {isGenerating ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {isGenerating && (
                  <div className="flex-none">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsGenerating(false)}
                      className="h-10 w-10 rounded-xl hover:bg-secondary/80"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AiInterface;
