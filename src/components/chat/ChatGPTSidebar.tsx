import { Plus, Search, Image, Zap, Activity, Heart, X, MessageSquare, Trash2, Edit2, Check } from "lucide-react";
import { Conversation } from "@/types/chat";
import { useState, useEffect, useRef } from "react";

interface ChatGPTSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal: () => void;
  onNavigate: (section: string) => void;
}

const ChatGPTSidebar = ({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
  onRename,
  isOpen,
  onClose,
  onOpenAuthModal,
  onNavigate,
}: ChatGPTSidebarProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter conversations based on search query
  const filteredConversations = searchQuery.trim()
    ? conversations.filter((conv) => {
        const query = searchQuery.toLowerCase();
        // Search in title
        if (conv.title.toLowerCase().includes(query)) return true;
        // Search in messages
        return conv.messages.some((msg) =>
          msg.content.toLowerCase().includes(query)
        );
      })
    : conversations;

  // Group conversations by date
  const groupConversationsByDate = (convs: Conversation[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups = {
      today: [] as Conversation[],
      yesterday: [] as Conversation[],
      previous: [] as Conversation[],
    };

    convs.forEach((conv) => {
      const convDate = new Date(conv.createdAt);
      const convDay = new Date(convDate.getFullYear(), convDate.getMonth(), convDate.getDate());

      if (convDay.getTime() === today.getTime()) {
        groups.today.push(conv);
      } else if (convDay.getTime() === yesterday.getTime()) {
        groups.yesterday.push(conv);
      } else {
        groups.previous.push(conv);
      }
    });

    return groups;
  };

  const groupedConversations = groupConversationsByDate(filteredConversations);

  // Focus search input when search mode is activated
  useEffect(() => {
    if (searchMode && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchMode]);

  // Keyboard shortcut: Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchMode(true);
      }
      // Escape to close search
      if (e.key === "Escape" && searchMode) {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchMode]);

  const openSearch = () => {
    setSearchMode(true);
    setSearchQuery("");
  };

  const closeSearch = () => {
    setSearchMode(false);
    setSearchQuery("");
  };

  const startEditing = (conv: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditValue(conv.title);
  };

  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      onRename(id, editValue.trim());
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  // Highlight matching text in search results
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index} className="bg-primary/30 text-foreground rounded px-0.5">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  const menuItems = [
    { icon: Search, label: "Search Chats", section: "search", disabled: false },
    { icon: Image, label: "Images", section: "images", disabled: false },
    { icon: Zap, label: "Apps", section: "apps", disabled: false },
    { icon: Activity, label: "Deep Research", section: "research", disabled: false },
    { icon: Heart, label: "Health", section: "health", disabled: false },
  ];

  const handleMenuClick = (section: string, disabled: boolean) => {
    if (disabled) return;
    if (section === "search") {
      openSearch();
      return;
    }
    onNavigate(section);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50 bg-sidebar flex flex-col
          border-r border-border
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-[-100%]"}
          md:relative md:translate-x-0
        `}
      >
        {/* Header with New Chat or Search */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-border">
          {searchMode ? (
            /* Search Input */
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={closeSearch}
                className="p-0.5 rounded hover:bg-background transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            /* New Chat Button */
            <>
              <button
                onClick={() => {
                  onNewChat();
                  onClose();
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg
                         text-sm font-medium text-foreground hover:bg-sidebar-hover transition-colors"
              >
                <Plus className="w-5 h-5 shrink-0" />
                <span>New Chat</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors md:hidden ml-2"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </>
          )}
        </div>

        {/* Menu Items - hide when searching */}
        {!searchMode && (
          <div className="px-2 py-3 border-b border-border">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.section, item.disabled)}
                disabled={item.disabled}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                         text-sidebar-foreground hover:bg-sidebar-hover transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Search hint when in search mode */}
        {searchMode && searchQuery.trim() && (
          <div className="px-4 py-2 border-b border-border">
            <p className="text-xs text-muted-foreground">
              {filteredConversations.length} result{filteredConversations.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {filteredConversations.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-xs text-muted-foreground">
                {searchMode && searchQuery.trim()
                  ? "No conversations found"
                  : "No conversations yet"}
              </p>
              {searchMode && searchQuery.trim() && (
                <button
                  onClick={closeSearch}
                  className="mt-2 text-xs text-primary hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Today */}
              {groupedConversations.today.length > 0 && (
                <div>
                  <h3 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Today
                  </h3>
                  <div className="space-y-0.5 mt-1">
                    {groupedConversations.today.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conv={conv}
                        activeId={activeId}
                        editingId={editingId}
                        editValue={editValue}
                        searchMode={searchMode}
                        searchQuery={searchQuery}
                        onSelect={() => {
                          onSelect(conv.id);
                          onClose();
                          if (searchMode) closeSearch();
                        }}
                        onStartEdit={(e) => startEditing(conv, e)}
                        onSaveEdit={() => saveEdit(conv.id)}
                        onDelete={(e) => {
                          e.stopPropagation();
                          onDelete(conv.id);
                        }}
                        setEditValue={setEditValue}
                        cancelEdit={cancelEdit}
                        highlightText={highlightText}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Yesterday */}
              {groupedConversations.yesterday.length > 0 && (
                <div>
                  <h3 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Yesterday
                  </h3>
                  <div className="space-y-0.5 mt-1">
                    {groupedConversations.yesterday.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conv={conv}
                        activeId={activeId}
                        editingId={editingId}
                        editValue={editValue}
                        searchMode={searchMode}
                        searchQuery={searchQuery}
                        onSelect={() => {
                          onSelect(conv.id);
                          onClose();
                          if (searchMode) closeSearch();
                        }}
                        onStartEdit={(e) => startEditing(conv, e)}
                        onSaveEdit={() => saveEdit(conv.id)}
                        onDelete={(e) => {
                          e.stopPropagation();
                          onDelete(conv.id);
                        }}
                        setEditValue={setEditValue}
                        cancelEdit={cancelEdit}
                        highlightText={highlightText}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Previous Chats */}
              {groupedConversations.previous.length > 0 && (
                <div>
                  <h3 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Previous Chats
                  </h3>
                  <div className="space-y-0.5 mt-1">
                    {groupedConversations.previous.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conv={conv}
                        activeId={activeId}
                        editingId={editingId}
                        editValue={editValue}
                        searchMode={searchMode}
                        searchQuery={searchQuery}
                        onSelect={() => {
                          onSelect(conv.id);
                          onClose();
                          if (searchMode) closeSearch();
                        }}
                        onStartEdit={(e) => startEditing(conv, e)}
                        onSaveEdit={() => saveEdit(conv.id)}
                        onDelete={(e) => {
                          e.stopPropagation();
                          onDelete(conv.id);
                        }}
                        setEditValue={setEditValue}
                        cancelEdit={cancelEdit}
                        highlightText={highlightText}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom section - hide when searching */}
        {!searchMode && (
          <div className="p-3 border-t border-border space-y-3">
            <div className="px-3 py-2 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">
                Get responses tailored to you
              </p>
              <button
                onClick={onOpenAuthModal}
                className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium
                         hover:bg-primary/90 transition-colors min-h-[44px]"
              >
                Log in
              </button>
            </div>
          </div>
        )}

        {/* Search hint at bottom when in search mode */}
        {searchMode && (
          <div className="p-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground text-center">
              Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">Esc</kbd> to close search
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

// Conversation Item Component
interface ConversationItemProps {
  conv: Conversation;
  activeId: string | null;
  editingId: string | null;
  editValue: string;
  searchMode: boolean;
  searchQuery: string;
  onSelect: () => void;
  onStartEdit: (e: React.MouseEvent) => void;
  onSaveEdit: () => void;
  onDelete: (e: React.MouseEvent) => void;
  setEditValue: (value: string) => void;
  cancelEdit: () => void;
  highlightText: (text: string, query: string) => React.ReactNode;
}

const ConversationItem = ({
  conv,
  activeId,
  editingId,
  editValue,
  searchMode,
  searchQuery,
  onSelect,
  onStartEdit,
  onSaveEdit,
  onDelete,
  setEditValue,
  cancelEdit,
  highlightText,
}: ConversationItemProps) => {
  return (
    <div className="group">
      <button
        onClick={onSelect}
        className={`
          w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left
          transition-all duration-200
          ${
            conv.id === activeId
              ? "bg-sidebar-active text-foreground shadow-sm"
              : "text-sidebar-foreground hover:bg-sidebar-hover hover:shadow-sm"
          }
        `}
      >
        <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />
        {editingId === conv.id ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") onSaveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            onBlur={onSaveEdit}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-background border border-border rounded px-2 py-0.5 text-foreground outline-none focus:ring-1 focus:ring-primary"
            autoFocus
          />
        ) : (
          <span className="truncate flex-1 font-medium">
            {searchMode && searchQuery.trim()
              ? highlightText(conv.title, searchQuery)
              : conv.title}
          </span>
        )}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {editingId === conv.id ? (
            <Check
              className="w-3.5 h-3.5 text-primary hover:text-primary/80 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onSaveEdit();
              }}
            />
          ) : (
            <Edit2
              className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={onStartEdit}
            />
          )}
          <Trash2
            className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </button>
    </div>
  );
};

export default ChatGPTSidebar;
