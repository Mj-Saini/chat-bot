import { useState, useRef, useEffect } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import { ChatSidebar } from "./ChatSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm mChat AI, your intelligent assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate AI response
  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);

    // Simulate thinking time
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000),
    );

    const responses = [
      "That's a great question! Let me think about that for a moment...",
      "I understand what you're asking. Here's my perspective on that:",
      "Interesting point! I'd be happy to help you with that.",
      "Based on what you've shared, here's what I think:",
      "That's a complex topic. Let me break it down for you:",
      "I appreciate you asking about that. Here's my analysis:",
      "Great observation! Let me elaborate on that:",
      "That's definitely worth exploring. Here's my take:",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    const aiMessage: Message = {
      id: Date.now().toString(),
      content: randomResponse + " " + generateContextualResponse(userMessage),
      role: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  // Generate contextual responses based on user input
  const generateContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello there! It's great to meet you. What would you like to chat about today?";
    }

    if (lowerMessage.includes("help")) {
      return "I'm here to assist you with a wide range of topics including coding, writing, analysis, creative tasks, and general questions. What specific area would you like help with?";
    }

    if (lowerMessage.includes("code") || lowerMessage.includes("programming")) {
      return "I'd be happy to help with coding! I can assist with multiple programming languages, debugging, code reviews, and explaining concepts. What programming challenge are you working on?";
    }

    if (lowerMessage.includes("write") || lowerMessage.includes("writing")) {
      return "I can definitely help with writing tasks! Whether it's creative writing, technical documentation, emails, or any other form of writing, I'm here to assist. What kind of writing project are you working on?";
    }

    return "I find that topic quite fascinating! There are many angles we could explore. Would you like me to dive deeper into any specific aspect, or do you have follow-up questions?";
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    await simulateAIResponse(content);
  };

  const startNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages([
      {
        id: "welcome-" + newChat.id,
        content:
          "Hello! I'm ready to help you with anything you need. What would you like to discuss?",
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  };

  const loadChat = (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={startNewChat}
        onLoadChat={loadChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 ">
        {/* Header */}
        <ChatHeader
          onMenuClick={() => setSidebarOpen(true)}
          currentChat={chats.find((c) => c.id === currentChatId)}
        />

        {/* Messages */}
        <div className="flex-1 overflow-auto dark:bg-[#2a2a2a]">
          <MessageList messages={messages} isTyping={isTyping} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
