import { Icon } from '@/components/Icon';
import { PLANOS } from '@/data/acdks';
import { useChat } from '@/context/ChatContext';

export function Planos() {
  const { openChat } = useChat();
  return (
    <section
      id="planos"
      style={{
        padding: '160px var(--pad)',
        background: 'var(--paper-soft)',
        borderTop: '1px solid var(--line-soft)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 80px' }}>
          <div className="eyebrow" style={{ marginBottom: 24, justifyContent: 'center' }}>
            V · Assinaturas
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(56px, 7vw, 112px)', lineHeight: 0.92, fontWeight: 400 }}>
            SEM LIMITE,
            <br />
            <span style={{ color: 'var(--copper-deep)' }}>SEM PRESSA.</span>
          </h2>
          <p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.7, color: 'var(--ink-mute)' }}>
            Plano mensal para o cavalheiro que visita a casa toda semana. Use quantas vezes desejar, dentro da modalidade
            contratada. Plano nominal, válido apenas para o titular.
          </p>
        </div>

        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {PLANOS.map((p) => {
            const featured = !!p.destaque;
            return (
              <article
                key={p.id}
                style={{
                  background: featured ? 'var(--ink)' : 'var(--cream)',
                  color: featured ? 'var(--cream)' : 'var(--ink)',
                  padding: '44px 36px',
                  border: '1px solid ' + (featured ? 'var(--ink)' : 'var(--line-soft)'),
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      left: 28,
                      padding: '6px 14px',
                      background: 'var(--copper)',
                      color: 'var(--cream)',
                      fontFamily: 'var(--mono)',
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Mais escolhido
                  </div>
                )}
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: featured ? 'var(--copper-soft)' : 'var(--ink-mute)',
                  }}
                >
                  Plano · {p.nome}
                </div>
                <div style={{ marginTop: 28, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 14, color: featured ? 'var(--copper-soft)' : 'var(--ink-mute)' }}>R$</span>
                  <span
                    className="display"
                    style={{ fontSize: 80, fontWeight: 400, lineHeight: 0.9, letterSpacing: '0.005em' }}
                  >
                    {Math.floor(p.preco)}
                  </span>
                  <span style={{ fontSize: 14, color: featured ? 'var(--copper-soft)' : 'var(--ink-mute)' }}>
                    ,{(p.preco % 1).toFixed(2).slice(2)}/mês
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    margin: '36px 0',
                    flex: 1,
                  }}
                >
                  {p.inclui.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        gap: 12,
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: featured ? '#D4C8AE' : 'var(--ink-soft)',
                      }}
                    >
                      <span
                        style={{
                          color: featured ? 'var(--copper-soft)' : 'var(--copper-deep)',
                          marginTop: 2,
                          flexShrink: 0,
                        }}
                      >
                        <Icon.Check size={12} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openChat}
                  className="btn btn-arrow"
                  style={{
                    borderColor: featured ? 'var(--copper-soft)' : 'var(--ink)',
                    color: featured ? 'var(--cream)' : 'var(--ink)',
                    background: 'transparent',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  Assinar plano
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
