import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { BARBAS, CORTES, type Servico } from '@/data/acdks';
import { useChat } from '@/context/ChatContext';

type Tab = 'cortes' | 'barbas';

export function Servicos() {
  const { openChat } = useChat();
  const [tab, setTab] = useState<Tab>('cortes');
  const list: Servico[] = tab === 'cortes' ? CORTES : BARBAS;

  return (
    <section
      id="servicos"
      style={{
        padding: '140px var(--pad) 120px',
        background: 'var(--paper-soft)',
        borderTop: '1px solid var(--line-soft)',
        borderBottom: '1px solid var(--line-soft)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div
          data-reveal
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 80, alignItems: 'end' }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              II · Serviços
            </div>
            <h2
              className="display"
              style={{
                fontSize: 'clamp(56px, 7vw, 112px)',
                lineHeight: 0.92,
                fontWeight: 400,
                letterSpacing: '0.005em',
              }}
            >
              Cada serviço,
              <br />
              <span style={{ color: 'var(--copper-deep)' }}>um ofício à parte.</span>
            </h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-mute)', maxWidth: 460 }}>
            Trabalhamos com tempos generosos. Um momento especial só seu, concretizado por quem o valoriza. Cada serviço é executado por um único profissional especializado, do início ao fim.
          </p>
        </div>

        <div data-reveal style={{ display: 'flex', gap: 0, marginBottom: 0, borderBottom: '1px solid var(--line)' }}>
          {(
            [
              ['cortes', 'Cortes'],
              ['barbas', 'Barbas'],
            ] as Array<[Tab, string]>
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: '16px 32px',
                fontFamily: 'var(--display)',
                fontSize: 22,
                letterSpacing: '0.08em',
                borderBottom: tab === k ? '2px solid var(--copper)' : '2px solid transparent',
                marginBottom: -1,
                color: tab === k ? 'var(--ink)' : 'var(--ink-faint)',
                transition: 'all .2s',
              }}
            >
              {l}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <span
            style={{
              alignSelf: 'center',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
            }}
          >
            {list.length} {tab === 'cortes' ? 'modalidades' : 'opções'}
          </span>
        </div>

        <div
          data-reveal
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 1,
            background: 'var(--line-soft)',
            border: '1px solid var(--line)',
            borderTop: 0,
          }}
        >
          {list.map((s, i) => (
            <article
              key={s.id}
              onClick={openChat}
              style={{
                background: 'var(--paper)',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                cursor: 'pointer',
                transition: 'background .25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--cream)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--paper)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--copper-deep)', letterSpacing: '0.2em' }}>
                  N° {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    color: 'var(--ink-faint)',
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center',
                  }}
                >
                  <Icon.Clock size={11} /> {s.duracao}
                </span>
              </div>
              <h3
                className="display"
                style={{ fontSize: 36, fontWeight: 400, lineHeight: 1, marginTop: 12, letterSpacing: '0.02em' }}
              >
                {s.nome}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-mute)', minHeight: 66 }}>{s.desc}</p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginTop: 'auto',
                  paddingTop: 18,
                  borderTop: '1px solid var(--line-soft)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 9,
                      color: 'var(--ink-faint)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                    }}
                  >
                    a partir de
                  </span>
                  <div className="display" style={{ fontSize: 30, color: 'var(--copper-deep)', marginTop: 4 }}>
                    R$ {s.preco}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    color: 'var(--ink-mute)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  Reservar →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
