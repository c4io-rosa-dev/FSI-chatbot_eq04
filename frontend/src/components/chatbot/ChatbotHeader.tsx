import { ChatbotHeaderProps } from "@/interfaces/IChatbotHeader";
import { Icon } from "../Icon";
import { useState } from "react";



export default function ChatbotHeader({ fullscreen, onToggleFullscreen, onClose }: ChatbotHeaderProps) {

  const [isOnline, setIsOnline] = useState(true);
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
              background: isOnline ? '#358600' : '#C58A3A',
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
            {isOnline ? 'ONLINE' : 'EM MANUTENÇÃO'}
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
