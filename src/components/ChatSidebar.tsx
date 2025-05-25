
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
  Trash2
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
  ]);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 mb-3">
            <Clock className="h-4 w-4" />
            Recent Chats
          </div>
          <Separator className="mb-3" />
        </div>
        
        <ScrollArea className="flex-1 px-2">
          <SidebarMenu>
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton className="w-full justify-between group hover:bg-secondary/50">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{chat.title}</div>
                      <div className="text-xs text-foreground/50">{chat.timestamp}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
