import { useState, type CSSProperties } from 'react';
import { Icon } from '@/components/Icon';
import { useChat } from '@/context/ChatContext';
import ChatbotHeader from './ChatbotHeader';
import MaintenancePanel from './MaintenancePanel';
import Chat from './Chat';

export function Chatbot() {
  const { open, fullscreen, closeChat, toggleFullscreen } = useChat();
  const [isActive, setIsActive] = useState(true);
  if (!open) return null;

  // Backend (Python) ainda não conectado — UI fica em modo manutenção.
  const panelStyle: CSSProperties = fullscreen
    ? {
        position: 'fixed',
        inset: '5vh 5vw',
        zIndex: 100,
        background: 'var(--cream)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 80px rgba(21,17,13,0.4)',
        border: '1px solid var(--ink)',
        overflow: 'hidden',
      }
    : {
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        width: 'min(420px, calc(100vw - 48px))',
        height: 'min(680px, calc(100vh - 48px))',
        background: 'var(--cream)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 60px rgba(21,17,13,0.32), 0 4px 12px rgba(21,17,13,0.18)',
        border: '1px solid var(--ink)',
        animation: 'pop-in .25s ease',
        overflow: 'hidden',
      };

  return (
    <div style={panelStyle}>
      <ChatbotHeader fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} onClose={closeChat} />
      {isActive ? 
        <Chat/> :
        <MaintenancePanel />
      }
    </div>
  );
}

