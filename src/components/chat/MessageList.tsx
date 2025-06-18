import { Message } from "./ChatInterface";
import { MessageItem } from "./Message";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 px-4 py-6 custom-scrollbar ">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
}
