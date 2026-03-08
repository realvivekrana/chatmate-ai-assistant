import { useState } from "react";
import ChatGPTSidebar from "@/components/chat/ChatGPTSidebar";
import TopNavbar from "@/components/chat/TopNavbar";
import ChatWindow from "@/components/chat/ChatWindow";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import AuthModal from "@/components/chat/AuthModal";
import ImagesSection from "@/components/sections/ImagesSection";
import AppsSection from "@/components/sections/AppsSection";
import ResearchSection from "@/components/sections/ResearchSection";
import HealthSection from "@/components/sections/HealthSection";
import { useChat } from "@/hooks/useChat";

type Section = "chat" | "images" | "apps" | "research" | "health";

/** ChatGPT-style chat application page */
const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("chat");
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    createNewChat,
    sendMessage,
    setActiveConversationId,
    deleteConversation,
    renameConversation,
  } = useChat();

  const hasMessages = activeConversation && activeConversation.messages.length > 0;

  const handleNavigate = (section: string) => {
    setActiveSection(section as Section);
  };

  const handleBackToChat = () => {
    setActiveSection("chat");
  };

  const handleSelectChat = (id: string) => {
    setActiveConversationId(id);
    setActiveSection("chat");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <ChatGPTSidebar
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={handleSelectChat}
        onNewChat={createNewChat}
        onDelete={deleteConversation}
        onRename={renameConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeSection === "chat" && (
          <>
            <TopNavbar
              onToggleSidebar={() => setSidebarOpen((v) => !v)}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />

            {/* Content area */}
            {!hasMessages ? (
              <WelcomeScreen onSend={sendMessage} />
            ) : (
              <ChatWindow
                conversation={activeConversation}
                isTyping={isTyping}
                onSend={sendMessage}
                onNewChat={createNewChat}
                onOpenGallery={() => setActiveSection("images")}
              />
            )}
          </>
        )}

        {activeSection === "images" && <ImagesSection onBack={handleBackToChat} />}
        {activeSection === "apps" && <AppsSection onBack={handleBackToChat} />}
        {activeSection === "research" && <ResearchSection onBack={handleBackToChat} />}
        {activeSection === "health" && <HealthSection onBack={handleBackToChat} />}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default ChatPage;
