import { Menu, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onToggleSidebar: () => void;
  title: string;
}

/** Top navigation bar with sidebar toggle and conversation title */
const Navbar = ({ onToggleSidebar, title }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <header className="h-14 sm:h-16 flex items-center justify-between px-3 py-2 border-b border-border bg-card shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-accent transition-colors md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Title */}
      <h1 className="text-sm sm:text-base font-medium text-foreground truncate max-w-[150px] sm:max-w-md flex-1 text-center">
        <span className="hidden sm:inline">{title}</span>
      </h1>

      {/* Brand */}
      <div className="flex items-center gap-1.5 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="text-xs font-semibold hidden sm:inline">AI Chat</span>
      </div>
    </header>
  );
};

export default Navbar;
