import { Menu, Sparkles, Sun, Moon, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useRef, useEffect } from "react";

interface TopNavbarProps {
  onToggleSidebar: () => void;
  onOpenAuthModal: () => void;
}

const TopNavbar = ({ onToggleSidebar, onOpenAuthModal }: TopNavbarProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Get initials from user name or email
  const getInitials = () => {
    if (!user) return "U";
    const name = user.name || user.email;
    const parts = name.split(/[\s@]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Get provider display name
  const getProviderName = () => {
    if (!user?.provider) return "";
    const providers: Record<string, string> = {
      google: "Google",
      apple: "Apple",
      phone: "Phone",
      email: "Email",
    };
    return providers[user.provider] || user.provider;
  };

  // Get display name based on provider
  const getDisplayName = () => {
    if (!user) return "";
    
    switch (user.provider) {
      case "phone":
        // Mask phone number: +1 (555) ***-4567
        const phone = user.email;
        if (phone.includes("(") && phone.includes(")")) {
          const parts = phone.split(")");
          if (parts.length > 1) {
            const lastFour = parts[1].trim().slice(-4);
            return `${parts[0]}) ***-${lastFour}`;
          }
        }
        return phone;
      case "google":
      case "apple":
      case "email":
      default:
        return user.name;
    }
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 md:h-16 items-center justify-between px-3 md:px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Hamburger Menu - Mobile/Tablet */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-muted/80 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline-block text-base md:text-lg font-semibold text-foreground">
              ChatMate AI
            </span>
          </div>
        </div>

        {/* Center Section - Optional Title */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          {/* Can add page title or breadcrumbs here if needed */}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted/80 transition-all duration-200 group"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-12 transition-all duration-200" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:-rotate-12 transition-all duration-200" />
            )}
          </button>

          {isAuthenticated ? (
            /* User Profile Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 md:p-2 rounded-lg hover:bg-muted/80 transition-colors group"
                aria-label="User menu"
              >
                {/* Avatar */}
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center ring-2 ring-background shadow-sm">
                  <span className="text-xs md:text-sm font-semibold text-primary-foreground">
                    {getInitials()}
                  </span>
                </div>
                
                {/* User Name - Hidden on mobile */}
                <div className="hidden lg:flex flex-col items-start max-w-[120px]">
                  <span className="text-sm font-medium text-foreground truncate">
                    {getDisplayName()}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    via {getProviderName()}
                  </span>
                </div>

                {/* Dropdown Arrow */}
                <ChevronDown className={`hidden md:block w-4 h-4 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-foreground">
                          {getInitials()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {getDisplayName()}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 px-2 py-1 bg-primary/10 rounded text-xs text-primary font-medium">
                      Logged in with {getProviderName()}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        // Add profile settings handler here
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/80 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Login Buttons */
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuthModal}
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-foreground hover:bg-muted/80 rounded-lg transition-colors"
              >
                Log in
              </button>
              <button
                onClick={onOpenAuthModal}
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="hidden sm:inline">Sign up for free</span>
                <span className="sm:hidden">Sign up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
