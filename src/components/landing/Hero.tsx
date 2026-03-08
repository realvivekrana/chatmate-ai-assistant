import { ArrowRight, Sparkles, MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Powered by Advanced AI</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Your AI Assistant for{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Everything
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Experience the power of AI conversations. Get instant answers, creative ideas, 
              and intelligent assistance for any task. ChatMate AI makes complex problems simple.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/chat"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary 
                         text-primary-foreground rounded-xl font-semibold text-base sm:text-lg
                         hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/25"
              >
                Start Chatting
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-muted 
                         text-foreground rounded-xl font-semibold text-base sm:text-lg
                         hover:bg-muted/80 transition-all"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-border">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">10K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">1M+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Messages Sent</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">99.9%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 
                          border border-primary/20 overflow-hidden shadow-2xl">
              {/* Mock Chat Interface */}
              <div className="absolute inset-4 bg-background/95 rounded-xl p-6 space-y-4">
                {/* Mock messages */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-br-md max-w-xs">
                    <p className="text-sm">How can AI help me today?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-md max-w-xs">
                    <p className="text-sm">I can assist with coding, writing, analysis, and much more!</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-br-md max-w-xs">
                    <p className="text-sm">That's amazing! Let's get started.</p>
                  </div>
                </div>
                
                {/* Floating icons */}
                <div className="absolute top-10 right-10 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute bottom-20 left-10 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce delay-500">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
