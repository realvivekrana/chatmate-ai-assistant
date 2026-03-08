import { MessageSquare, History, Zap, Smartphone, Palette, Shield } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Conversations",
    description: "Engage in natural, intelligent conversations with advanced AI that understands context and nuance.",
  },
  {
    icon: History,
    title: "Multiple Chat History",
    description: "Keep track of all your conversations with organized chat history that persists across sessions.",
  },
  {
    icon: Zap,
    title: "Smart Responses",
    description: "Get instant, accurate answers powered by cutting-edge AI technology and natural language processing.",
  },
  {
    icon: Smartphone,
    title: "Fast Interface",
    description: "Lightning-fast performance with smooth animations and responsive design for the best user experience.",
  },
  {
    icon: Palette,
    title: "Modern UI",
    description: "Beautiful, intuitive interface designed with modern design principles and attention to detail.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your conversations are stored locally in your browser, ensuring complete privacy and security.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-xs sm:text-sm font-medium text-primary">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Everything You Need
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Powerful features designed to make your AI conversations seamless and productive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 bg-background rounded-2xl border border-border 
                       hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5
                       hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center 
                            group-hover:bg-primary/20 transition-colors mb-4 sm:mb-6">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
