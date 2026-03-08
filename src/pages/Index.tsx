import { useState } from "react";
import Sidebar from "@/components/chat/Sidebar";
import Navbar from "@/components/chat/Navbar";
import ChatWindow from "@/components/chat/ChatWindow";
import { useChat } from "@/hooks/useChat";

/** Main page — assembles sidebar, navbar, and chat window */
const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    createNewChat,
    sendMessage,
    setActiveConversationId,
    deleteConversation,
  } = useChat();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={setActiveConversationId}
        onNewChat={createNewChat}
        onDelete={deleteConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          title={activeConversation?.title ?? "New Chat"}
        />
        <ChatWindow
          conversation={activeConversation}
          isTyping={isTyping}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
};

export default Index;
