import { useState, useCallback } from "react";
import { Message, Conversation } from "@/types/chat";
import { getRandomResponse, getResponseDelay } from "@/data/dummyResponses";

/** Generate a unique ID */
const generateId = () => crypto.randomUUID();

/** Custom hook that manages all chat state and logic */
export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

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
          content: getRandomResponse(),
          timestamp: new Date(),
        };
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === targetId ? { ...conv, messages: [...conv.messages, aiMessage] } : conv
          )
        );
        setIsTyping(false);
      }, getResponseDelay());
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

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    createNewChat,
    sendMessage,
    setActiveConversationId,
    deleteConversation,
  };
}
