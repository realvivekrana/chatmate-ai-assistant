import { useState, useCallback, useEffect } from "react";
import { Message, Conversation } from "@/types/chat";
import { generateAIResponse } from "@/utils/aiResponses";

/** Generate a unique ID */
const generateId = () => crypto.randomUUID();

const STORAGE_KEY = "chatmate_conversations";
const ACTIVE_CHAT_KEY = "chatmate_active_chat";

/** Load conversations from localStorage */
const loadConversations = (): Conversation[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((conv: any) => ({
      ...conv,
      createdAt: new Date(conv.createdAt),
      messages: conv.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch {
    return [];
  }
};

/** Save conversations to localStorage */
const saveConversations = (conversations: Conversation[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error("Failed to save conversations:", error);
  }
};

/** Custom hook that manages all chat state and logic */
export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with a new chat on first load
  useEffect(() => {
    // Clear active chat from localStorage on page load
    localStorage.removeItem(ACTIVE_CHAT_KEY);
    
    // Start with no active conversation (shows welcome screen)
    setActiveConversationId(null);
  }, []);

  // Persist conversations to localStorage
  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  // Persist active conversation ID
  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem(ACTIVE_CHAT_KEY, activeConversationId);
    } else {
      localStorage.removeItem(ACTIVE_CHAT_KEY);
    }
  }, [activeConversationId]);

  // Get current conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;

  // Create a new conversation
  const createNewChat = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  }, []);

  // Send a message and simulate AI response
  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim()) return;

      let targetId = activeConversationId;

      // Auto-create conversation if none active
      if (!targetId) {
        const newConv: Conversation = {
          id: generateId(),
          title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
          messages: [],
          createdAt: new Date(),
        };
        setConversations((prev) => [newConv, ...prev]);
        targetId = newConv.id;
        setActiveConversationId(targetId);
      }

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      // Update conversation title if first message
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== targetId) return conv;
          const isFirst = conv.messages.length === 0;
          return {
            ...conv,
            title: isFirst ? content.slice(0, 30) + (content.length > 30 ? "..." : "") : conv.title,
            messages: [...conv.messages, userMessage],
          };
        })
      );

      // Simulate AI typing and response
      setIsTyping(true);
      setTimeout(() => {
        const aiMessage: Message = {
          id: generateId(),
          role: "ai",
          content: generateAIResponse(content),
          timestamp: new Date(),
        };
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === targetId ? { ...conv, messages: [...conv.messages, aiMessage] } : conv
          )
        );
        setIsTyping(false);
      }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds delay
    },
    [activeConversationId]
  );

  // Delete a conversation
  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) setActiveConversationId(null);
    },
    [activeConversationId]
  );

  // Rename a conversation
  const renameConversation = useCallback((id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, title: newTitle } : conv))
    );
  }, []);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    createNewChat,
    sendMessage,
    setActiveConversationId,
    deleteConversation,
    renameConversation,
  };
}
