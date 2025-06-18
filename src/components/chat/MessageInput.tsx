import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Mic,
  MicOff,
  Paperclip,
  MoreHorizontal,
  Lightbulb,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const PROMPT_TEMPLATES = [
  "Explain this concept simply...",
  "Help me write a professional email about...",
  "Code review: Can you check this code for...",
  "Brainstorm ideas for...",
  "Summarize the key points of...",
  "What are the pros and cons of...",
];

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check for speech recognition support
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setVoiceSupported(true);
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setMessage((prev) => prev + transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      // 🗝️ ye magic hai bhai
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };



  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const insertTemplate = (template: string) => {
    setMessage(template);
    textareaRef.current?.focus();
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="border-t bg-[#f0eeee] shadow dark:bg-[#2a2a2a] p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-2">
            <div className="flex items-end gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 sm:w-10 sm:h-10 sm:bg-[#845f52]/20 sm:border border-[#845f52]"
                    disabled={disabled}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  {/* Attach file item */}
                  <DropdownMenuItem disabled>
                    <Paperclip className="mr-2 h-4 w-4" />
                    Attach file (Coming soon)
                  </DropdownMenuItem>

                  {/* Prompt templates title */}
                  <div className="px-2 py-1 text-xs text-muted-foreground">
                    Prompt Templates
                  </div>

                  {/* Prompt templates items */}
                  {PROMPT_TEMPLATES.map((template, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => insertTemplate(template)}
                      className="text-sm"
                    >
                      {template}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

           
            </div>


            {/* Main input area */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className={cn(
                  "min-h-[40px] text-xs md:text-sm placeholder:text-black dark:placeholder:text-white resize-none chat-input bg-[#845f52]/20 border border-[#845f52]",
                  "pr-8 sm:pr-12",
                  isListening && "ring-2 ring-red-500 animate-pulse-glow",
                )}
                disabled={disabled}
              />

              {/* Voice input button */}
              {voiceSupported && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant={isListening ? "destructive" : "ghost"}
                      size="icon"
                      className="absolute right-0 sm:right-2 bottom-1 h-8 w-8 hover:bg-transparent"
                      onClick={toggleListening}
                      disabled={disabled}
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isListening ? "Stop listening" : "Voice input"}
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Send button */}

            </div>
            <Button
              type="submit"
              size="icon"
              className="sm:w-10 sm:h-10 dark:hover:bg-[#c1966c] bg-[#845f52]/20 dark:bg-[#3e3737] border border-[#845f52]"
              disabled={!message.trim() || disabled}
            >
              <Send className="h-9 w-9 text-[#845f52] dark:text-[#f0f0f0]" />
            </Button>

          </div>
        </form>

        {/* Voice status */}
        {isListening && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Listening... Speak now
          </div>
        )}


      </div>
    </div>
  );
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
