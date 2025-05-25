
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  MessageSquare,
  Plus,
  Clock,
  Trash2,
  Edit3
} from "lucide-react";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
}

export function ChatSidebar() {
  const [chatHistory] = useState<ChatHistory[]>([
    { id: "1", title: "Programming best practices", timestamp: "2 hours ago" },
    { id: "2", title: "Machine learning basics", timestamp: "Yesterday" },
    { id: "3", title: "React components guide", timestamp: "2 days ago" },
    { id: "4", title: "API design patterns", timestamp: "1 week ago" },
    { id: "5", title: "Database optimization tips", timestamp: "1 week ago" },
    { id: "6", title: "CSS Grid vs Flexbox", timestamp: "2 weeks ago" },
  ]);

  return (
    <Sidebar className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <SidebarHeader className="p-4 border-b border-border/40">
        <Button className="w-full justify-start gap-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm h-11 rounded-lg font-medium">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <div className="px-2 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/60 mb-3">
            <Clock className="h-4 w-4" />
            Recent Conversations
          </div>
          <Separator className="bg-border/40" />
        </div>
        
        <ScrollArea className="flex-1">
          <SidebarMenu className="gap-1">
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton className="w-full justify-between group hover:bg-secondary/80 rounded-lg transition-all duration-200 p-3 h-auto min-h-[60px]">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <MessageSquare className="h-4 w-4 shrink-0 mt-0.5 text-foreground/60" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground leading-tight mb-1">
                        {chat.title}
                      </div>
                      <div className="text-xs text-foreground/50">{chat.timestamp}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-secondary/80 transition-colors"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
