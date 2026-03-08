import { useState, useRef, useEffect } from "react";
import { Send, Plus, Mic, MicOff, MessageSquarePlus, Upload, Image, Sparkles, X } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  onNewChat?: () => void;
  onOpenGallery?: () => void;
}

/** Text input area with send button and Enter-to-send */
const ChatInput = ({ onSend, disabled, onNewChat, onOpenGallery }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setValue(transcript);
      setIsListening(false);
      // Focus textarea after voice input
      textareaRef.current?.focus();
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Close quick actions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setShowQuickActions(false);
      }
    };

    if (showQuickActions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQuickActions]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 150) + "px";
    }
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
    // Reset textarea height after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    if (!voiceSupported) {
      alert("Voice input is not supported on this device.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        setIsListening(false);
        alert("Voice input is not supported on this device.");
      }
    }
  };

  const handleQuickAction = (action: string) => {
    setShowQuickActions(false);
    
    switch (action) {
      case "newChat":
        onNewChat?.();
        break;
      case "upload":
        alert("File upload feature coming soon!");
        break;
      case "generateImage":
        const prompt = window.prompt("Enter image generation prompt:");
        if (prompt) {
          alert(`Generating image: "${prompt}"\n\nThis is a demo. Real image generation coming soon!`);
        }
        break;
      case "gallery":
        onOpenGallery?.();
        break;
    }
  };

  return (
    <div className="w-full p-3 sm:p-4 border-t border-border/50 bg-background/95 backdrop-blur shrink-0">
      <div className="max-w-4xl mx-auto w-full relative">
        {/* Quick Actions Popup */}
        {showQuickActions && (
          <div
            ref={quickActionsRef}
            className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-xl shadow-2xl p-2 min-w-[240px] animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="flex items-center justify-between px-3 py-2 mb-1">
              <span className="text-sm font-semibold text-foreground">Quick Actions</span>
              <button
                onClick={() => setShowQuickActions(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleQuickAction("newChat")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <MessageSquarePlus className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">New Chat</div>
                  <div className="text-xs text-muted-foreground">Start a new conversation</div>
                </div>
              </button>
              <button
                onClick={() => handleQuickAction("upload")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <Upload className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Upload File</div>
                  <div className="text-xs text-muted-foreground">Share documents or images</div>
                </div>
              </button>
              <button
                onClick={() => handleQuickAction("generateImage")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Generate Image</div>
                  <div className="text-xs text-muted-foreground">Create AI artwork</div>
                </div>
              </button>
              <button
                onClick={() => handleQuickAction("gallery")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <Image className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Open Gallery</div>
                  <div className="text-xs text-muted-foreground">Browse AI images</div>
                </div>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end gap-2 bg-muted/50 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 border border-border/50 shadow-sm focus-within:border-primary/50 focus-within:shadow-md transition-all duration-200">
          {/* Plus button */}
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className={`p-2 rounded-lg transition-colors shrink-0 self-end ${
              showQuickActions ? "bg-primary text-primary-foreground" : "hover:bg-background/80"
            }`}
            aria-label="Quick actions"
            title="Quick actions"
            disabled={disabled}
          >
            <Plus className={`w-5 h-5 ${showQuickActions ? "text-primary-foreground" : "text-muted-foreground"}`} />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening..." : "Send a message..."}
            disabled={disabled || isListening}
            rows={1}
            className="flex-1 bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground
                       resize-none outline-none py-2 max-h-[120px] sm:max-h-[150px] min-h-[24px]"
          />

          {/* Voice button */}
          <button
            onClick={toggleVoiceInput}
            className={`p-2 rounded-lg transition-colors shrink-0 self-end ${
              isListening
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "hover:bg-background/80"
            } ${!voiceSupported ? "opacity-40 cursor-not-allowed" : ""}`}
            aria-label={isListening ? "Stop listening" : "Voice input"}
            title={!voiceSupported ? "Voice input not supported" : isListening ? "Stop listening" : "Start voice input"}
            disabled={disabled || !voiceSupported}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 text-destructive-foreground" />
            ) : (
              <Mic className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className="p-2 rounded-lg bg-primary text-primary-foreground
                       hover:bg-primary/90 transition-all duration-200
                       disabled:opacity-40 disabled:cursor-not-allowed shrink-0 self-end
                       shadow-sm hover:shadow-md"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-2 px-2">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground text-[10px]">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground text-[10px]">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
