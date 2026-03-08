import { Bot } from "lucide-react";

/** Animated typing indicator shown while AI is "thinking" */
const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-msg-in">
      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="bg-chat-ai px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
        <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
        <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
      </div>
    </div>
  );
};

export default TypingIndicator;
