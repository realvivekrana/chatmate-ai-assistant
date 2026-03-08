import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { Conversation } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  conversation: Conversation | null;
  isTyping: boolean;
  onSend: (message: string) => void;
  onNewChat?: () => void;
  onOpenGallery?: () => void;
}

/** Main chat area with messages, typing indicator, and input */
const ChatWindow = ({ conversation, isTyping, onSend, onNewChat, onOpenGallery }: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);

  // Auto-scroll to bottom on new messages (only if user hasn't scrolled up)
  useEffect(() => {
    const el = scrollRef.current;
    if (el && !userScrolled) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [conversation?.messages, isTyping, userScrolled]);

  // Detect user scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (el) {
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
      setUserScrolled(!isAtBottom);
    }
  };

  // Example prompts for empty state
  const examplePrompts = [
    { icon: "💡", text: "Explain React hooks", category: "Learning" },
    { icon: "⚡", text: "Write a JavaScript function", category: "Coding" },
    { icon: "🚀", text: "Give me startup ideas", category: "Business" },
    { icon: "🐛", text: "Help me debug my code", category: "Development" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Messages area - scrollable */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto overflow-x-hidden"
        onScroll={handleScroll}
      >
        {!conversation || conversation.messages.length === 0 ? (
          /* Empty state with example prompts */
          <div className="h-full flex flex-col items-center justify-center px-4 py-8">
            <div className="max-w-3xl w-full space-y-8">
              {/* Welcome message */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 ring-1 ring-primary/20">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                  Ask anything. Discover everything.
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                  Start a conversation with your AI assistant. Choose an example below or type your own question.
                </p>
              </div>

              {/* Example prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => onSend(prompt.text)}
                    className="group p-4 text-left rounded-xl border border-border bg-card hover:bg-muted/50
                             transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-primary mb-1">{prompt.category}</p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {prompt.text}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages list with improved spacing */
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-4">
            {conversation.messages.map((msg) => (
              <MessageBubble 
                key={msg.id} 
                message={msg}
                onRegenerate={() => {
                  // Regenerate functionality can be added here
                  console.log("Regenerate message:", msg.id);
                }}
                onDelete={() => {
                  // Delete functionality can be added here
                  console.log("Delete message:", msg.id);
                }}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Input - sticky at bottom */}
      <div className="sticky bottom-0 w-full z-10">
        <ChatInput 
          onSend={onSend} 
          disabled={isTyping}
          onNewChat={onNewChat}
          onOpenGallery={onOpenGallery}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
