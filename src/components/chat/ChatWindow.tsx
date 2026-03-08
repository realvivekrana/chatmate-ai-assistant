import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { Conversation } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  conversation: Conversation | null;
  isTyping: boolean;
  onSend: (message: string) => void;
}

/** Main chat area with messages, typing indicator, and input */
const ChatWindow = ({ conversation, isTyping, onSend }: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [conversation?.messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {!conversation || conversation.messages.length === 0 ? (
          /* Empty state */
          <div className="h-full flex flex-col items-center justify-center px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">How can I help you today?</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Start a conversation by typing a message below. I'm here to assist you with anything you need.
            </p>
          </div>
        ) : (
          /* Messages list */
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            {conversation.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isTyping} />
    </div>
  );
};

export default ChatWindow;
