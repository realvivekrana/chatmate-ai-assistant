import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

interface HealthSectionProps {
  onBack: () => void;
}

const HealthSection = ({ onBack }: HealthSectionProps) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [loading, setLoading] = useState(false);

  const healthResponses = [
    "Based on general health guidelines, it's important to maintain a balanced diet, regular exercise, and adequate sleep. However, for personalized advice, please consult with a healthcare professional.",
    "That's a great health question! While I can provide general information, it's always best to consult with a qualified healthcare provider for medical advice specific to your situation.",
    "Health and wellness involve many factors including nutrition, physical activity, mental health, and regular check-ups. For specific concerns, please reach out to a medical professional.",
  ];

  const handleSend = async () => {
    if (!question.trim()) return;
    const userMessage = question;
    setQuestion("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = healthResponses[Math.floor(Math.random() * healthResponses.length)];
    setMessages((prev) => [...prev, { role: "ai", content: response }]);
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-border">
        <button 
          onClick={onBack} 
          className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium
                     text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Health Assistant</h1>
        <p className="text-sm text-muted-foreground mt-2">Get general health information and wellness tips</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-5xl sm:text-6xl mb-4">🏥</div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Ask a Health Question</h2>
              <p className="text-sm text-muted-foreground px-4">Get general health information and wellness guidance</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] sm:max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="px-4 py-3 bg-muted rounded-2xl"><div className="flex gap-1">{[0, 1, 2].map((i) => (<div key={i} className="w-2 h-2 bg-muted-foreground rounded-full typing-dot" />))}</div></div></div>}
        </div>
      </div>

      <div className="p-4 sm:p-6 border-t border-border">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input 
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            onKeyDown={(e) => e.key === "Enter" && handleSend()} 
            placeholder="Ask a health question..." 
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-muted rounded-lg text-sm sm:text-base
                       text-foreground placeholder:text-muted-foreground 
                       focus:outline-none focus:ring-2 focus:ring-primary" 
            disabled={loading} 
          />
          <button 
            onClick={handleSend} 
            disabled={!question.trim() || loading} 
            className="px-3 sm:px-4 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg 
                       hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthSection;
