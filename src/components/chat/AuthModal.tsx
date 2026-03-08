import { X, Mail, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoadingProvider("email");
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Extract name from email
      const name = email.split("@")[0];
      await login(email, "demo-password", name, "email");
      
      // Reset form and close
      setEmail("");
      setShowEmailForm(false);
      onClose();
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setLoadingProvider(provider.toLowerCase());
    setError("");
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      let demoEmail: string;
      let demoName: string;
      
      // Create realistic demo user based on provider
      switch (provider.toLowerCase()) {
        case "google":
          demoEmail = "demo.user@gmail.com";
          demoName = "Demo User";
          break;
        case "apple":
          demoEmail = "demo.user@icloud.com";
          demoName = "Apple User";
          break;
        case "phone":
          demoEmail = "+1 (555) 123-4567";
          demoName = "Phone User";
          break;
        default:
          demoEmail = `user@${provider.toLowerCase()}.com`;
          demoName = `${provider} User`;
      }
      
      await login(demoEmail, "demo-password", demoName, provider.toLowerCase());
      
      onClose();
    } catch (error) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setShowEmailForm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
          disabled={loadingProvider !== null}
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="p-8">
          {!showEmailForm ? (
            <>
              {/* Title */}
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Log in or sign up
              </h2>

              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Social buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin("Google")}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-background
                           border border-border rounded-lg text-foreground font-medium
                           hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingProvider === "google" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </button>

                <button
                  onClick={() => handleSocialLogin("Apple")}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-background
                           border border-border rounded-lg text-foreground font-medium
                           hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingProvider === "apple" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                  )}
                  Continue with Apple
                </button>

                <button
                  onClick={() => handleSocialLogin("Phone")}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-background
                           border border-border rounded-lg text-foreground font-medium
                           hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingProvider === "phone" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  )}
                  Continue with Phone
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">OR</span>
                </div>
              </div>

              {/* Email button */}
              <button
                onClick={() => setShowEmailForm(true)}
                disabled={loadingProvider !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary
                         text-primary-foreground rounded-lg font-medium
                         hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="w-5 h-5" />
                Continue with Email
              </button>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                Demo login system for preview purposes.
              </p>
            </>
          ) : (
            <>
              {/* Email form */}
              <button
                onClick={() => {
                  setShowEmailForm(false);
                  setError("");
                }}
                disabled={loadingProvider !== null}
                className="mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors
                         disabled:opacity-50"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Enter your email
              </h2>

              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                             transition-all"
                    disabled={loadingProvider !== null}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email || loadingProvider !== null}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary 
                           text-primary-foreground rounded-lg font-medium
                           hover:bg-primary/90 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingProvider === "email" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                Demo mode: Use any email to sign in
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
