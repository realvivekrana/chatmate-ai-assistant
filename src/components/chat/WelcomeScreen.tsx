import { Plus, Mic, MicOff, Loader2 } from "lucide-react";
import { useState, KeyboardEvent, useEffect, useRef } from "react";

interface WelcomeScreenProps {
  onSend: (message: string) => void;
}

const WelcomeScreen = ({ onSend }: WelcomeScreenProps) => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Example prompts
  const examplePrompts = [
    "Explain React hooks",
    "Write a JavaScript function",
    "Give me startup ideas",
    "Help me debug my code",
  ];

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        alert("Microphone access denied. Please allow microphone access to use voice input.");
      }
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

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    if (!voiceSupported) {
      alert("Voice input is not supported in this browser. Please try Chrome, Edge, or Safari.");
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
      }
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
        {/* Heading */}
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground px-4">
            Ask anything. Discover everything.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Your AI assistant is ready. What would you like to explore today?
          </p>
        </div>

        {/* Large input box */}
        <div className="relative px-2 sm:px-0">
          <div className="flex items-end gap-2 sm:gap-3 bg-muted/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-2.5 sm:p-3 md:p-4 border border-border shadow-lg">
            {/* Plus icon */}
            <button
              className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl hover:bg-background transition-colors shrink-0 self-end"
              aria-label="Add attachment"
              title="Add attachment (coming soon)"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-muted-foreground" />
            </button>

            {/* Textarea */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "Ask anything"}
              rows={1}
              className="flex-1 bg-transparent text-sm sm:text-base md:text-lg text-foreground placeholder:text-muted-foreground
                       resize-none outline-none py-2 sm:py-2.5 md:py-3 max-h-[150px] sm:max-h-[200px] min-h-[32px] sm:min-h-[40px]"
              style={{
                height: "auto",
                minHeight: "32px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, window.innerWidth < 640 ? 150 : 200) + "px";
              }}
              disabled={isListening}
            />

            {/* Voice/Send button */}
            {message.trim() ? (
              <button
                onClick={handleSend}
                className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-primary text-primary-foreground
                         hover:bg-primary/90 transition-colors shrink-0 self-end"
                aria-label="Send message"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            ) : (
              <button
                onClick={toggleVoiceInput}
                disabled={!voiceSupported}
                className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl shrink-0 self-end transition-colors
                         ${isListening 
                           ? "bg-destructive text-destructive-foreground animate-pulse" 
                           : "bg-primary text-primary-foreground hover:bg-primary/90"
                         }
                         disabled:opacity-40 disabled:cursor-not-allowed`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
                title={!voiceSupported ? "Voice input not supported in this browser" : ""}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                ) : (
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                )}
              </button>
            )}
          </div>

          {/* Helper text */}
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground text-center mt-3 sm:mt-4 px-2">
            {isListening ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                Listening... Speak now
              </span>
            ) : (
              "ChatMate can make mistakes. Check important info."
            )}
          </p>
        </div>

        {/* Example Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2 sm:px-0">
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => {
                setMessage(prompt);
                // Auto-send after a brief delay
                setTimeout(() => onSend(prompt), 100);
              }}
              className="p-4 text-left rounded-xl border border-border bg-card hover:bg-muted/50
                       transition-all duration-200 hover:shadow-md hover:border-primary/30 group"
            >
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {prompt}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
