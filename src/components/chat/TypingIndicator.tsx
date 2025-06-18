import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function TypingIndicator() {
  return (
    <div className="chat-message transition-all duration-200 hover:bg-muted/30 rounded-lg p-3 -mx-3 mr-12">
      <div className="flex gap-3">
        {/* AI Avatar */}
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
          <AvatarFallback className="bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
            AI
          </AvatarFallback>
        </Avatar>

        {/* Typing content */}
        <div className="flex-1 space-y-2">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">mChat AI</span>
            <span className="text-xs text-muted-foreground">typing...</span>
          </div>

          {/* Typing animation */}
          <div className="inline-block px-4 py-2 rounded-lg bg-muted">
            <div className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
