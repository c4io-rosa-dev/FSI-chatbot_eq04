import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

interface ChatContextValue {
  open: boolean;
  fullscreen: boolean;
  openChat: () => void;
  openChatFullscreen: () => void;
  closeChat: () => void;
  toggleFullscreen: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const openChat = useCallback(() => setOpen(true), []);
  const openChatFullscreen = useCallback(() => {
    setOpen(true);
    setFullscreen(true);
  }, []);
  const closeChat = useCallback(() => {
    setOpen(false);
    setFullscreen(false);
  }, []);
  const toggleFullscreen = useCallback(() => setFullscreen((v) => !v), []);

  return (
    <ChatContext.Provider value={{ open, fullscreen, openChat, openChatFullscreen, closeChat, toggleFullscreen }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
