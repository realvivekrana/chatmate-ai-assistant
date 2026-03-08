import { Menu, Sparkles } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
  title: string;
}

/** Top navigation bar with sidebar toggle and conversation title */
const Navbar = ({ onToggleSidebar, title }: NavbarProps) => {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-border bg-card shrink-0">
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Title */}
      <h1 className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-md">
        {title}
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
