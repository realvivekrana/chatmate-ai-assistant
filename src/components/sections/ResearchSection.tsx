import { ArrowLeft, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { generateResearchResult, sampleResearchTopics } from "@/data/research";

interface ResearchSectionProps {
  onBack: () => void;
}

const ResearchSection = ({ onBack }: ResearchSectionProps) => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof generateResearchResult> | null>(null);

  const handleResearch = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResult(generateResearchResult(topic));
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-border bg-background/95 backdrop-blur">
        <button onClick={onBack} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors mb-3">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Deep Research</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Get comprehensive research on any topic</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleResearch()} placeholder="Enter research topic..." className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-muted rounded-lg text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" disabled={loading} />
            <button onClick={handleResearch} disabled={!topic.trim() || loading} className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base">
              {loading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Search className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span>Research</span>
            </button>
          </div>

          {!result && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleResearchTopics.map((t) => (
                <button key={t} onClick={() => { setTopic(t); }} className="px-2 sm:px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs sm:text-sm text-foreground transition-colors">
                  {t}
                </button>
              ))}
            </div>
          )}

          {result && (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6 bg-card border border-border rounded-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">{result.topic}</h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{result.summary}</p>
              </div>
              <div className="p-4 sm:p-6 bg-card border border-border rounded-xl">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Key Points</h3>
                <ul className="space-y-2">
                  {result.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                      <span className="text-primary">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchSection;
