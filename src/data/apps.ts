export interface AIApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  demoType?: "code" | "text" | "translator" | "resume" | "blog" | "ideas" | "email" | "study";
}

export const aiApps: AIApp[] = [
  {
    id: "1",
    name: "AI Code Helper",
    description: "Get instant code suggestions, debugging help, and explanations",
    icon: "💻",
    category: "Development",
    features: ["Code completion", "Bug detection", "Code explanation", "Refactoring suggestions"],
    demoType: "code"
  },
  {
    id: "2",
    name: "Text Summarizer",
    description: "Summarize long articles, documents, and texts instantly",
    icon: "📝",
    category: "Productivity",
    features: ["Quick summaries", "Key points extraction", "Multiple formats", "Length control"],
    demoType: "text"
  },
  {
    id: "3",
    name: "Blog Generator",
    description: "Create engaging blog posts and articles with AI assistance",
    icon: "✍️",
    category: "Content",
    features: ["Topic ideas", "Outline generation", "SEO optimization", "Multiple tones"],
    demoType: "blog"
  },
  {
    id: "4",
    name: "Language Translator",
    description: "Translate text between 100+ languages accurately",
    icon: "🌍",
    category: "Language",
    features: ["100+ languages", "Context-aware", "Instant translation", "Pronunciation guide"],
    demoType: "translator"
  },
  {
    id: "5",
    name: "Startup Idea Generator",
    description: "Get innovative startup ideas powered by AI",
    icon: "🚀",
    category: "Business",
    features: ["Business ideas", "Market analysis", "Trend insights", "Validation tips"],
    demoType: "ideas"
  },
  {
    id: "6",
    name: "Email Writer",
    description: "Compose professional emails in seconds",
    icon: "📧",
    category: "Communication",
    features: ["Professional tone", "Quick replies", "Templates", "Grammar check"],
    demoType: "email"
  },
  {
    id: "7",
    name: "Study Assistant",
    description: "Get help with homework, explanations, and learning",
    icon: "📚",
    category: "Education",
    features: ["Step-by-step solutions", "Concept explanations", "Practice questions", "Study tips"],
    demoType: "study"
  },
  {
    id: "8",
    name: "Resume Writer",
    description: "Create professional resumes with AI optimization",
    icon: "💼",
    category: "Career",
    features: ["ATS optimized", "Multiple templates", "Skill highlighting", "Cover letters"],
    demoType: "resume"
  },
];
