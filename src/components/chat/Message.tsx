



import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Volume2,
  Download,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Message } from "./ChatInterface";

interface MessageProps {
  message: Message;
}

export function MessageItem({ message }: MessageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast({
        title: "Copied to clipboard",
        description: "Message content has been copied.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Unable to copy message content.",
        variant: "destructive",
      });
    }
  };

  const speakMessage = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(message.content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const exportMessage = () => {
    const timestamp = message.timestamp.toLocaleString();
    const exportContent = `[${timestamp}] ${message.role.toUpperCase()}: ${message.content}`;

    const blob = new Blob([exportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `message-${message.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="px-3 py-1 text-xs text-[#845f52] dark:text-muted-foreground bg-muted rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group chat-message transition-all duration-200 relative text-xs md:text-sm",
        "rounded-lg p-3 -mx-3",
        isUser ? "ml-12" : "mr-12",
      )}
    >
      <div className={cn("flex gap-1 sm:gap-3", isUser && "flex-row-reverse")}>
        {/* Avatar */}
        <Avatar className="sm:h-8 h-5 w-5 sm:w-8 shrink-0 text-xs">
          {isUser ? (
            <>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="dark:bg-brand-400 dark:text-primary-foreground ">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
                <AvatarFallback className="bg-brand-100 text-brand-600 dark:bg-brand-400 dark:text-primary-foreground">
                AI
              </AvatarFallback>
            </>
          )}
        </Avatar>

        {/* Message content */}
        <div className={cn("flex-1 space-y-2", isUser && "text-right")}>
          {/* Header */}
          <div
            className={cn(
              "flex items-center gap-2",
              isUser && "flex-row-reverse",
            )}
          >
            <span className="text-sm font-medium">
              {isUser ? user?.name || "You" : "mChat AI"}
            </span>
            <span className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Content */}
          <div
            className={cn(
              "prose prose-sm max-w-none dark:prose-invert",
              isUser ? "text-right" : "text-left",
            )}
          >
            <div
              className={cn(
                "inline-block px-4 py-2 rounded-lg max-w-full",
                isUser
                  ? "bg-[#845f52]/20 dark:bg-muted dark:text-white ml-auto"
                  : "bg-[#845f52]/20 dark:bg-muted",
              )}
            >
              <p className="whitespace-pre-wrap break-words m-0">
                {message.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Icon like WhatsApp */}
      <div
        className={cn(
          "absolute top-9 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          isUser ? "right-8 sm:right-14" : "left-8 sm:left-14",
        )}
      >
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon" className="h-6 w-6 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isUser ? "end" : "start"}>
            <DropdownMenuItem onClick={copyToClipboard}>
              <Copy className="mr-2 h-3 w-3" />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={speakMessage}>
              <Volume2 className="mr-2 h-3 w-3" />
              Speak
            </DropdownMenuItem>
           
            <DropdownMenuItem onClick={exportMessage}>
              <Download className="mr-2 h-3 w-3" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
