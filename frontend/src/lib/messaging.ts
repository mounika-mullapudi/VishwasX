export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  messages: Message[];
  lastMessage?: string;
  lastMessageTime?: string;
}

const STORAGE_KEY = "vishwasx_conversations";

const initialConversations: Conversation[] = [
  {
    id: "conv-1",
    participantId: "mentor-1",
    participantName: "Anita Desai",
    participantRole: "VP of Engineering at Swiggy",
    participantAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnitaDesai",
    messages: [
      {
        id: "m-1",
        senderId: "mentor-1",
        senderName: "Anita Desai",
        receiverId: "user",
        content: "Hi Priya! I reviewed your career restart roadmap. Your background in full-stack engineering is strong. How can I help you prepare for technical rounds?",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        read: true,
      },
    ],
    lastMessage: "Hi Priya! I reviewed your career restart roadmap...",
    lastMessageTime: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

export const getConversations = (): Conversation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading conversations:", e);
  }
  return initialConversations;
};

const saveConversations = (conversations: Conversation[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
};

export const getOrCreateConversation = (
  participantId: string,
  participantName: string,
  participantRole: string,
  participantAvatar: string
): Conversation => {
  const conversations = getConversations();
  const existing = conversations.find((c) => c.participantId === participantId);
  if (existing) {
    return existing;
  }

  const newConv: Conversation = {
    id: `conv_${Date.now()}`,
    participantId,
    participantName,
    participantRole,
    participantAvatar,
    messages: [
      {
        id: `msg_${Date.now()}`,
        senderId: participantId,
        senderName: participantName,
        receiverId: "user",
        content: `Hello! I'm ${participantName}. Feel free to ask any questions about restarting your career or interview strategies.`,
        timestamp: new Date().toISOString(),
        read: true,
      },
    ],
    lastMessage: `Hello! I'm ${participantName}.`,
    lastMessageTime: new Date().toISOString(),
  };

  conversations.unshift(newConv);
  saveConversations(conversations);
  return newConv;
};

export const sendMessage = (
  conversationId: string,
  senderId: string,
  senderName: string,
  senderAvatar: string,
  receiverId: string,
  content: string
): Message => {
  const conversations = getConversations();
  const conv = conversations.find((c) => c.id === conversationId);

  const newMsg: Message = {
    id: `msg_${Date.now()}`,
    senderId,
    senderName,
    senderAvatar,
    receiverId,
    content,
    timestamp: new Date().toISOString(),
    read: false,
  };

  if (conv) {
    conv.messages.push(newMsg);
    conv.lastMessage = content;
    conv.lastMessageTime = newMsg.timestamp;
    saveConversations(conversations);

    // AI automated reply simulation after 1.5 seconds if sent to mentor
    setTimeout(() => {
      const currentConvs = getConversations();
      const targetConv = currentConvs.find((c) => c.id === conversationId);
      if (targetConv) {
        const replyMsg: Message = {
          id: `reply_${Date.now()}`,
          senderId: targetConv.participantId,
          senderName: targetConv.participantName,
          senderAvatar: targetConv.participantAvatar,
          receiverId: senderId,
          content: `Thanks for reaching out! Focus on structuring your recent portfolio projects, brushing up on system design basics, and highlighting your transferrable leadership skills. You've got this!`,
          timestamp: new Date().toISOString(),
          read: false,
        };
        targetConv.messages.push(replyMsg);
        targetConv.lastMessage = replyMsg.content;
        targetConv.lastMessageTime = replyMsg.timestamp;
        saveConversations(currentConvs);
      }
    }, 1500);
  }

  return newMsg;
};

export const deleteConversation = (conversationId: string): void => {
  const conversations = getConversations().filter((c) => c.id !== conversationId);
  saveConversations(conversations);
};

export const markAllMessagesAsRead = (conversationId: string): void => {
  const conversations = getConversations();
  const conv = conversations.find((c) => c.id === conversationId);
  if (conv) {
    conv.messages.forEach((m) => {
      m.read = true;
    });
    saveConversations(conversations);
  }
};

export const formatMessageTime = (timestamp: string): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
