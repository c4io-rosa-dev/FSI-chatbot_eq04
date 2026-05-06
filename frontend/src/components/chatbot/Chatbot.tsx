import type { CSSProperties } from 'react';
import { Icon } from '@/components/Icon';
import { useChat } from '@/context/ChatContext';

export function Chatbot() {
  const { open, fullscreen, closeChat, toggleFullscreen } = useChat();
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
      };

  return (
    <div style={panelStyle}>
      <ChatbotHeader fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} onClose={closeChat} />
      <MaintenancePanel />
    </div>
  );
}

interface ChatbotHeaderProps {
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  onClose: () => void;
}

function ChatbotHeader({ fullscreen, onToggleFullscreen, onClose }: ChatbotHeaderProps) {
  return (
    <div
      style={{
        background: 'var(--ink)',
        color: 'var(--cream)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid var(--copper)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--copper)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--cream)',
            position: 'relative',
          }}
        >
          <Icon.Emblem size={28} />
          <div
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 12,
              height: 12,
              background: '#C58A3A',
              borderRadius: '50%',
              border: '2px solid var(--ink)',
            }}
          />
        </div>
        <div>
          <div className="display" style={{ fontSize: 18, lineHeight: 1, letterSpacing: '0.06em' }}>
            ACDKS BARBER
          </div>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--copper-soft)',
              marginTop: 4,
            }}
          >
            Em manutenção
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button
          onClick={onToggleFullscreen}
          title={fullscreen ? 'Reduzir' : 'Expandir'}
          style={{ width: 32, height: 32, color: 'var(--copper-soft)', display: 'grid', placeItems: 'center' }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {fullscreen ? (
              <>
                <path d="M9 3 V9 H3" />
                <path d="M21 9 H15 V3" />
                <path d="M3 15 H9 V21" />
                <path d="M15 21 V15 H21" />
              </>
            ) : (
              <>
                <path d="M3 9 V3 H9" />
                <path d="M15 3 H21 V9" />
                <path d="M21 15 V21 H15" />
                <path d="M9 21 H3 V15" />
              </>
            )}
          </svg>
        </button>
        <button
          onClick={onClose}
          title="Fechar"
          style={{ width: 32, height: 32, color: 'var(--cream)', display: 'grid', placeItems: 'center' }}
        >
          <Icon.Close />
        </button>
      </div>
    </div>
  );
}

function MaintenancePanel() {
  return (
    <div
      style={{
        flex: 1,
        padding: '40px 32px',
        background: 'var(--cream)',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(107,90,69,0.08) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 18,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          border: '2px solid var(--copper)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'var(--copper-deep)',
          background: 'var(--paper)',
          transform: 'rotate(-4deg)',
          position: 'relative',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M4.9 4.9 L7 7 M17 17 L19.1 19.1 M4.9 19.1 L7 17 M17 7 L19.1 4.9" />
        </svg>
        <span className="display" style={{ fontSize: 13, marginTop: 4, letterSpacing: '0.08em' }}>
          EM AJUSTE
        </span>
      </div>

      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--copper-deep)',
        }}
      >
        ◆ Aviso da casa ◆
      </div>
      <h3
        className="display"
        style={{ fontSize: 32, lineHeight: 1, letterSpacing: '0.02em', color: 'var(--ink)' }}
      >
        ATENDIMENTO
        <br />
        <span style={{ color: 'var(--copper-deep)' }}>EM PREPARO</span>
      </h3>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--ink-mute)', maxWidth: 320, fontWeight: 300 }}>
        Nosso assistente virtual está sendo afinado pelos mestres da casa. Em breve estará à disposição do senhor para
        reservas e consultas.
      </p>

      <div
        style={{
          marginTop: 12,
          padding: '14px 18px',
          background: 'var(--paper)',
          border: '1px solid var(--line-soft)',
          borderLeft: '3px solid var(--copper)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'flex-start',
          textAlign: 'left',
          maxWidth: 320,
          width: '100%',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
          }}
        >
          Enquanto isso · Reservas
        </div>
        <a
          href="tel:+551130000000"
          style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}
        >
          (11) 3000-0000
        </a>
        <a
          href="https://wa.me/5511900000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--copper-deep)' }}
        >
          WhatsApp · (11) 90000-0000
        </a>
      </div>

      <div
        style={{
          marginTop: 4,
          fontFamily: 'var(--mono)',
          fontSize: 8,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--ink-faint)',
        }}
      >
        Status · 503 · Service preparing
      </div>
    </div>
  );
}
