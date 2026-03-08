/** Represents a single message in a conversation */
export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

/** Represents a chat conversation */
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}
