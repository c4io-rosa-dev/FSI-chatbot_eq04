import { COMBOS } from '@/data/acdks';

export function Combos() {
  return (
    <section id="combos" style={{ padding: '160px var(--pad)' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div
          data-reveal
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 64, alignItems: 'end' }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              IV · Combos
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(56px, 7vw, 112px)', lineHeight: 0.92, fontWeight: 400 }}>
              Combinações
              <br />
              <span style={{ color: 'var(--copper-deep)' }}>com economia.</span>
            </h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-mute)', maxWidth: 460 }}>
            Para o cavalheiro que prefere reservar um único compromisso. Os preços variam conforme o profissional e o
            tempo de execução — o valor é confirmado durante o agendamento.
          </p>
        </div>

        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {COMBOS.map((c, i) => (
            <article
              key={c.grupo}
              style={{
                background: 'var(--cream)',
                border: '1px solid var(--line-soft)',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 440,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -1,
                  left: -1,
                  padding: '6px 12px',
                  background: i === 1 ? 'var(--copper)' : 'var(--ink)',
                  color: 'var(--cream)',
                  fontFamily: 'var(--mono)',
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                {String(i + 1).padStart(2, '0')} · {c.grupo}
              </div>
              <div
                className="display"
                style={{
                  fontSize: 44,
                  fontWeight: 400,
                  marginTop: 56,
                  color: 'var(--copper-deep)',
                  letterSpacing: '0.02em',
                }}
              >
                {c.faixa}
              </div>
              <div style={{ height: 1, background: 'var(--line-soft)', margin: '24px 0' }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {c.items.map((it, j) => (
                  <li
                    key={j}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}
                  >
                    <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.4 }}>{it.nome}</span>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 11,
                        color: 'var(--ink-mid)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      R$ {it.preco}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div
          data-reveal
          style={{
            marginTop: 40,
            padding: 24,
            background: 'var(--paper-soft)',
            border: '1px dashed var(--line)',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid var(--copper)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--copper-deep)',
              fontFamily: 'var(--display)',
              fontSize: 18,
            }}
          >
            !
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-mute)' }}>
            <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Observação:</strong> os preços apresentados são
            estimados. O valor final do combo depende do tipo de procedimento escolhido — confirmaremos no momento do
            agendamento.
          </div>
        </div>
      </div>
    </section>
  );
}
