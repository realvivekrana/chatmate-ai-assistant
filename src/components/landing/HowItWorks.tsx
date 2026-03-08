import { MessageCircle, Brain, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Ask a Question",
    description: "Type your question or request in natural language. No special commands needed.",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI Processes",
    description: "Our advanced AI analyzes your input and generates an intelligent, contextual response.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Get Instant Answer",
    description: "Receive accurate, helpful answers in seconds. Continue the conversation naturally.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-xs sm:text-sm font-medium text-primary">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Simple 3-Step Process
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Getting started with ChatMate AI is incredibly easy. Just follow these simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              {/* Step Card */}
              <div className="relative space-y-4 sm:space-y-6">
                {/* Icon Circle */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 
                                border-2 border-primary/30 flex items-center justify-center">
                    <step.icon className="w-10 h-10 sm:w-14 sm:h-14 text-primary" />
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground 
                                rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-4">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
