import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 
                      shadow-2xl shadow-primary/25 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative text-center space-y-6 sm:space-y-8">
            {/* Icon */}
            <div className="inline-flex w-12 h-12 sm:w-16 sm:h-16 items-center justify-center bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Experience AI?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto px-4">
              Join thousands of users who are already using ChatMate AI to boost their productivity 
              and get instant answers to their questions.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
              <Link
                to="/chat"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                         bg-white text-primary rounded-xl font-semibold text-base sm:text-lg
                         hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
              >
                Start Using ChatMate
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                         bg-white/10 text-white rounded-xl font-semibold text-base sm:text-lg backdrop-blur-sm
                         hover:bg-white/20 transition-all border border-white/20"
              >
                Learn More
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-6 sm:pt-8 text-white/80 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Privacy focused</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
