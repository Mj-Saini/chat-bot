import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Plus,
  MessageSquare,
  Search,
  MoreHorizontal,
  Calendar,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Chat } from "./ChatInterface";

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onLoadChat: (chatId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({
  chats,
  currentChatId,
  onNewChat,
  onLoadChat,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages.some((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const groupChatsByDate = (chats: Chat[]) => {
    const groups: { [key: string]: Chat[] } = {};
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    chats.forEach((chat) => {
      const chatDate = new Date(chat.updatedAt);
      const chatDateOnly = new Date(
        chatDate.getFullYear(),
        chatDate.getMonth(),
        chatDate.getDate(),
      );

      if (chatDateOnly.getTime() === today.getTime()) {
        groups["Today"] = groups["Today"] || [];
        groups["Today"].push(chat);
      } else if (chatDateOnly.getTime() === yesterday.getTime()) {
        groups["Yesterday"] = groups["Yesterday"] || [];
        groups["Yesterday"].push(chat);
      } else if (chatDate >= lastWeek) {
        groups["Last 7 days"] = groups["Last 7 days"] || [];
        groups["Last 7 days"].push(chat);
      } else {
        groups["Older"] = groups["Older"] || [];
        groups["Older"].push(chat);
      }
    });

    return groups;
  };

  const chatGroups = groupChatsByDate(filteredChats);

  const SidebarContent = () => (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 space-y-4 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chats</h2>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button> */}
        </div>

        <Button onClick={onNewChat} className="w-full justify-start gap-2 border border-[#845f52] dark:border-transparent dark:text-white text-[#845f52] placeholder:text-gray-500 dark:placeholder:text-muted-foreground">
          <Plus className="h-4 w-4 " />
          New Chat
        </Button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 dark:text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border border-[#845f52] placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <Separator />

      {/* Chat list */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {Object.keys(chatGroups).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="h-12 w-12 dark:text-muted-foreground mb-4" />
              <h3 className="font-medium dark:text-muted-foreground mb-2">
                No chats yet
              </h3>
              <p className="text-sm dark:text-muted-foreground">
                Start a new conversation to get began
              </p>
            </div>
          ) : (
            Object.entries(chatGroups).map(([group, groupChats]) => (
              <div key={group} className="mb-4">
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {group}
                </div>
                <div className="space-y-1">
                  {groupChats.map((chat) => (
                    <Button
                      key={chat.id}
                      variant={
                        currentChatId === chat.id ? "secondary" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start gap-3 h-auto p-3",
                        "hover:bg-muted/80 transition-colors",
                      )}
                      onClick={() => {
                        onLoadChat(chat.id);
                        onClose();
                      }}
                    >
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      <div className="flex-1 text-left overflow-hidden">
                        <div className="font-medium truncate">{chat.title}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {chat.messages.length > 0
                            ? chat.messages[chat.messages.length - 1].content
                            : "No messages"}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Add chat options menu
                        }}
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </Button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-80 border-r bg-[#f1f1f1] dark:bg-[#1e1e1e]">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="max-w-80 p-0 bg-[#ffffff] dark:bg-[#1e1e1e]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
