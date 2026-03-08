import { Bot, User, Copy, Check, RotateCcw, Trash2 } from "lucide-react";
import { Message } from "@/types/chat";
import { useState } from "react";

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
  onDelete?: () => void;
}

/** Renders a single chat message with appropriate styling for user/AI */
const MessageBubble = ({ message, onRegenerate, onDelete }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [hovering, setHovering] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Parse message content to detect code blocks
  const renderContent = () => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: JSX.Element[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = codeBlockRegex.exec(message.content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textBefore = message.content.slice(lastIndex, match.index);
        parts.push(
          <span key={`text-${key++}`} className="whitespace-pre-wrap">
            {textBefore}
          </span>
        );
      }

      // Add code block
      const language = match[1] || "code";
      const code = match[2].trim();
      parts.push(
        <CodeBlock key={`code-${key++}`} language={language} code={code} />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < message.content.length) {
      parts.push(
        <span key={`text-${key++}`} className="whitespace-pre-wrap">
          {message.content.slice(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : <span className="whitespace-pre-wrap">{message.content}</span>;
  };

  return (
    <div
      className={`flex gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 group ${
        isUser ? "justify-end" : "justify-start"
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 mt-1 ring-1 ring-primary/20">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
      )}

      {/* Message content */}
      <div className="flex flex-col gap-2 max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
        <div
          className={`
            px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base leading-relaxed break-words
            transition-all duration-200
            ${
              isUser
                ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm shadow-sm"
                : "bg-card text-card-foreground rounded-bl-sm border border-border/50 shadow-sm"
            }
          `}
        >
          {renderContent()}
        </div>

        {/* Message actions */}
        {hovering && (
          <div
            className={`flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            <button
              onClick={() => copyToClipboard(message.content)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                       bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground
                       transition-all duration-150 border border-border/50"
              title="Copy message"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>

            {!isUser && onRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                         bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground
                         transition-all duration-150 border border-border/50"
                title="Regenerate response"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Regenerate</span>
              </button>
            )}

            {onDelete && (
              <button
                onClick={onDelete}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                         bg-muted/80 hover:bg-destructive/10 text-muted-foreground hover:text-destructive
                         transition-all duration-150 border border-border/50 hover:border-destructive/20"
                title="Delete message"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0 mt-1 shadow-sm">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

/** Code block component with syntax highlighting and copy button */
const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden bg-muted/30 border border-border/50 shadow-sm">
      {/* Code header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border/50">
        <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
          {language}
        </span>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
                   bg-background/50 hover:bg-background text-muted-foreground hover:text-foreground
                   transition-all duration-150 border border-border/50"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
};

export default MessageBubble;
