import { Icon } from '@/components/Icon';
import { useChat } from '@/context/ChatContext';

export function ChatBubble() {
  const { open, openChat } = useChat();
  if (open) return null;

  return (
    <button
      onClick={openChat}
      aria-label="Abrir conversa"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 20px 14px 16px',
        background: 'var(--ink)',
        color: 'var(--cream)',
        border: '1px solid var(--copper)',
        boxShadow: '0 12px 32px rgba(21,17,13,0.32)',
        cursor: 'pointer',
        transition: 'all .25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--copper-deep)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--ink)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <span
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 28,
          height: 28,
          background: 'var(--copper)',
          borderRadius: '50%',
        }}
      >
        <Icon.Chat size={16} />
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
        <span className="display" style={{ fontSize: 16, letterSpacing: '0.06em' }}>
          RESERVAR
        </span>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 8,
            letterSpacing: '0.18em',
            color: 'var(--copper-soft)',
            marginTop: 3,
          }}
        >
          RESPOSTA · IMEDIATA
        </span>
      </span>
    </button>
  );
}
