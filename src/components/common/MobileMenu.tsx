import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-64 bg-card border-l border-border z-50 md:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-semibold text-foreground">Menu</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <a
              href="#home"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              How It Works
            </a>
            <a
              href="#about"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              About
            </a>

            <div className="pt-4 border-t border-border mt-4">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 mb-2">
                    <p className="text-xs text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/chat"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg bg-primary text-primary-foreground 
                             hover:bg-primary/90 transition-colors text-center font-medium mb-2"
                  >
                    Go to Chat
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 rounded-lg bg-muted text-foreground 
                             hover:bg-muted/80 transition-colors text-center font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg bg-muted text-foreground 
                             hover:bg-muted/80 transition-colors text-center font-medium mb-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg bg-primary text-primary-foreground 
                             hover:bg-primary/90 transition-colors text-center font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
