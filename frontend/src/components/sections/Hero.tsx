import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Placeholder } from '@/components/Placeholder';
import { useChat } from '@/context/ChatContext';

interface HeroProps {
  showStamp?: boolean;
}

export function Hero({ showStamp = true }: HeroProps) {
  const { openChat } = useChat();
  return (
    <section id="top" style={{ padding: '140px var(--pad) 100px' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'end' }}>
          <div data-reveal>
            <div className="ornament" style={{ marginBottom: 32 }}>
              <span className="ornament-line" />
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--copper)',
                }}
              >
                Estabelecida MMXIV · São Paulo
              </span>
              <span className="ornament-line" />
            </div>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(72px, 10vw, 168px)',
                lineHeight: 0.86,
                letterSpacing: '0.005em',
                fontWeight: 400,
                color: 'var(--ink)',
              }}
            >
              TRADIÇÃO
              <br />
              <span style={{ color: 'var(--copper-deep)' }}>NA NAVALHA</span>
              <br />
              <span
                className="serif-it"
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '0.45em',
                  display: 'inline-block',
                  marginTop: 12,
                  color: 'var(--ink-mid)',
                }}
              >
                desde 2014
              </span>
            </h1>
            <p
              style={{
                marginTop: 40,
                maxWidth: 540,
                fontSize: 17,
                lineHeight: 1.7,
                color: 'var(--ink-mute)',
                fontWeight: 300,
              }}
            >
              Uma barbearia para o cavalheiro que conhece a diferença entre um corte e um ofício. Toalha quente, navalha
              afiada e o atendimento de quem se lembra do seu nome — e do seu corte.
            </p>
            <div style={{ marginTop: 48, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-arrow" onClick={openChat}>
                Reservar horário
              </button>
              <Link className="btn" to="/servicos">
                Ver serviços
              </Link>
            </div>
            <div
              style={{
                marginTop: 72,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, auto)',
                gap: 56,
                borderTop: '1px solid var(--line-soft)',
                paddingTop: 32,
                maxWidth: 580,
              }}
            >
              {(
                [
                  ['XII', 'anos de ofício'],
                  ['III', 'mestres da casa'],
                  ['4.9', 'estrelas · 320 avaliações'],
                ] as Array<[string, string]>
              ).map(([n, l]) => (
                <div key={l}>
                  <div className="display" style={{ fontSize: 44, lineHeight: 1, color: 'var(--copper-deep)' }}>
                    {n}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-mute)',
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal style={{ position: 'relative' }}>
            <div style={{ background: 'var(--paper-soft)', padding: 14, border: '1px solid var(--line)' }}>
              <Placeholder label="Retrato · Salão principal" ratio="3/4" />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: -44,
                left: -44,
                width: 180,
                padding: 12,
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                boxShadow: '0 8px 24px rgba(21,17,13,0.12)',
              }}
            >
              <Placeholder label="Detalhe · Navalha em couro" ratio="1/1" />
            </div>
            <div
              style={{
                position: 'absolute',
                top: 28,
                right: -28,
                padding: '12px 18px',
                background: 'var(--ink)',
                color: 'var(--copper-soft)',
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                transform: 'rotate(2deg)',
              }}
            >
              Ter–Sáb · Por agendamento
            </div>
            {showStamp && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 32,
                  right: -52,
                  width: 112,
                  height: 112,
                  border: '2px solid var(--copper)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: 'var(--copper-deep)',
                  background: 'var(--paper)',
                  transform: 'rotate(-8deg)',
                }}
              >
                <Icon.Star size={16} />
                <span className="display" style={{ fontSize: 18, marginTop: 4, letterSpacing: '0.05em' }}>
                  SELO
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.2em', marginTop: 2 }}>
                  MMXXVI
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
