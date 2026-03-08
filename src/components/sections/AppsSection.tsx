import { ArrowLeft, Sparkles, X } from "lucide-react";
import { aiApps } from "@/data/apps";
import { useState } from "react";

interface AppsSectionProps {
  onBack: () => void;
}

const AppsSection = ({ onBack }: AppsSectionProps) => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [demoInput, setDemoInput] = useState("");
  const [demoOutput, setDemoOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenApp = (appId: string) => {
    setSelectedApp(appId);
    setDemoInput("");
    setDemoOutput("");
  };

  const handleRunDemo = async () => {
    if (!demoInput.trim() || !selectedApp) return;
    
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const app = aiApps.find((a) => a.id === selectedApp);
    let output = "";

    switch (app?.demoType) {
      case "code":
        output = `// Generated code for: ${demoInput}\n\nfunction solution() {\n  // AI-generated implementation\n  const result = processData();\n  return result;\n}\n\n// This is a demo. Real code generation coming soon!`;
        break;
      case "text":
        output = `Summary of your text:\n\n• Main point 1: Key insight from the content\n• Main point 2: Important detail highlighted\n• Main point 3: Core message extracted\n\nThis is a demo summarization. Real AI summarization coming soon!`;
        break;
      case "translator":
        output = `Translated text:\n\n"${demoInput}"\n\n→ [Translation would appear here]\n\nThis is a demo. Real translation coming soon!`;
        break;
      case "blog":
        output = `# ${demoInput}\n\n## Introduction\nAI-generated introduction paragraph...\n\n## Main Content\nDetailed content sections...\n\n## Conclusion\nWrapping up the article...\n\nThis is a demo. Real blog generation coming soon!`;
        break;
      case "ideas":
        output = `Startup Ideas based on "${demoInput}":\n\n1. 🚀 Idea #1: AI-powered solution\n2. 💡 Idea #2: Innovative platform\n3. ⚡ Idea #3: Disruptive service\n\nThis is a demo. Real idea generation coming soon!`;
        break;
      case "email":
        output = `Subject: ${demoInput}\n\nDear [Recipient],\n\nAI-generated professional email content...\n\nBest regards,\n[Your Name]\n\nThis is a demo. Real email generation coming soon!`;
        break;
      case "study":
        output = `Study Help for: ${demoInput}\n\n📚 Explanation:\nDetailed explanation of the concept...\n\n✅ Key Points:\n• Point 1\n• Point 2\n• Point 3\n\nThis is a demo. Real study assistance coming soon!`;
        break;
      case "resume":
        output = `Resume for: ${demoInput}\n\n[Professional Summary]\nAI-optimized summary...\n\n[Experience]\nWork experience section...\n\n[Skills]\nKey skills highlighted...\n\nThis is a demo. Real resume generation coming soon!`;
        break;
      default:
        output = `Demo output for: ${demoInput}\n\nThis is a demo. Real AI processing coming soon!`;
    }

    setDemoOutput(output);
    setLoading(false);
  };

  const selectedAppData = aiApps.find((app) => app.id === selectedApp);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-border bg-background/95 backdrop-blur">
        <button 
          onClick={selectedApp ? () => setSelectedApp(null) : onBack} 
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back{selectedApp ? " to Apps" : ""}
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          {selectedApp ? selectedAppData?.name : "AI Apps"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {selectedApp ? selectedAppData?.description : "Powerful AI tools for every task"}
        </p>
      </div>

      {!selectedApp ? (
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {aiApps.map((app) => (
              <div 
                key={app.id} 
                className="group p-4 sm:p-6 bg-card border border-border rounded-xl hover:border-primary/50 
                         transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 
                         hover:scale-[1.02] cursor-pointer"
                onClick={() => handleOpenApp(app.id)}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  {app.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                  {app.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.features.slice(0, 3).map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 bg-muted text-[10px] sm:text-xs rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <button
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium
                           hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenApp(app.id);
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Open App
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="p-4 sm:p-6 bg-card border border-border rounded-xl">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                Try it out
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Input
                  </label>
                  <textarea
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder={`Enter your ${selectedAppData?.demoType === "code" ? "code request" : "text"}...`}
                    className="w-full px-4 py-3 bg-muted rounded-lg text-sm sm:text-base text-foreground 
                             placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary
                             min-h-[120px] resize-y"
                    disabled={loading}
                  />
                </div>
                <button
                  onClick={handleRunDemo}
                  disabled={!demoInput.trim() || loading}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium
                           hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>

            {demoOutput && (
              <div className="p-4 sm:p-6 bg-card border border-border rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    Output
                  </h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(demoOutput)}
                    className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-xs font-medium transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-lg overflow-x-auto">
                  {demoOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsSection;
