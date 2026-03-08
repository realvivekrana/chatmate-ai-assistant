import { Plus, MessageSquare, Trash2, X, Sparkles } from "lucide-react";
import { Conversation } from "@/types/chat";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

/** Collapsible sidebar with chat history and new chat button */
const Sidebar = ({ conversations, activeId, onSelect, onNewChat, onDelete, isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed lg:relative z-50 top-0 left-0 h-full
          w-[var(--sidebar-width)] bg-sidebar flex flex-col
          border-r border-border
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:border-0 lg:overflow-hidden"}
        `}
      >
        {/* Header */}
        <div className="p-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm text-foreground">AI Chat</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-sidebar-hover transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* New Chat button */}
        <div className="px-3 pb-2 shrink-0">
          <button
            onClick={() => { onNewChat(); onClose(); }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border
                       text-sm font-medium text-foreground hover:bg-sidebar-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto px-2 pb-3">
          <p className="px-2 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Recent
          </p>
          {conversations.length === 0 ? (
            <p className="px-2 py-4 text-xs text-muted-foreground text-center">
              No conversations yet
            </p>
          ) : (
            <ul className="space-y-0.5">
              {conversations.map((conv) => (
                <li key={conv.id} className="group">
                  <button
                    onClick={() => { onSelect(conv.id); onClose(); }}
                    className={`
                      w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left
                      transition-colors
                      ${conv.id === activeId
                        ? "bg-sidebar-active text-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-hover"
                      }
                    `}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span className="truncate flex-1">{conv.title}</span>
                    <Trash2
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-muted-foreground
                                 hover:text-destructive transition-all shrink-0"
                      onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
