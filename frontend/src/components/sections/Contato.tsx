import { type ReactNode } from 'react';
import { useChat } from '@/context/ChatContext';

const FIELDS: Array<[string, ReactNode]> = [
  [
    'Endereço',
    <span key="e">
      Rua Aspicuelta, 412
      <br />
      Vila Madalena · São Paulo
    </span>,
  ],
  [
    'Funcionamento',
    <span key="f">
      Ter–Sex · 10h – 21h
      <br />
      Sáb · 9h – 19h
    </span>,
  ],
  ['Telefone', '+55 11 4002-8922'],
  [
    'E-mail',
    <span key="m">
      contato@
      <br />
      acdksbarber.com.br
    </span>,
  ],
];

export function Contato() {
  const { openChat } = useChat();
  return (
    <section id="contato" style={{ padding: '160px var(--pad)', borderTop: '1px solid var(--line-soft)' }}>
      <div
        style={{
          maxWidth: 'var(--maxw)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <div data-reveal>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            VI · A casa
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(56px, 7vw, 112px)', lineHeight: 0.92, fontWeight: 400 }}>
            Visite-nos.
            <br />
            <span style={{ color: 'var(--copper-deep)' }}>Sem pressa.</span>
          </h2>
          <div
            style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, maxWidth: 540 }}
          >
            {FIELDS.map(([t, c]) => (
              <div key={t}>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--copper-deep)',
                    marginBottom: 12,
                  }}
                >
                  {t}
                </div>
                <p
                  className="display"
                  style={{ fontSize: 22, lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '0.02em' }}
                >
                  {c}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          data-reveal
          style={{
            background: 'var(--ink)',
            color: 'var(--cream)',
            padding: 44,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              border: '1px solid var(--copper-deep)',
              borderRadius: '50%',
              opacity: 0.4,
            }}
          />
          <div style={{ position: 'relative' }}>
            <div className="eyebrow" style={{ color: 'var(--copper-soft)', marginBottom: 16 }}>
              Reservas
            </div>
            <h3 className="display" style={{ fontSize: 44, fontWeight: 400, lineHeight: 1, letterSpacing: '0.02em' }}>
              RESERVE SEU
              <br />
              <span style={{ color: 'var(--copper-soft)' }}>HORÁRIO AGORA</span>
            </h3>
            <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.6, color: '#B8AC92' }}>
              Consulte serviços, planos, escolha seu profissional e confirme seu horário em segundos. Atendimento
              disponível em qualquer hora do dia.
            </p>
            <button
              onClick={openChat}
              className="btn btn-copper btn-arrow"
              style={{ marginTop: 32, width: '100%', justifyContent: 'space-between' }}
            >
              Reservar online
            </button>
            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: '1px solid #2A2014',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7A6F58',
              }}
            >
              <span>Resposta imediata</span>
              <span>24h · 7 dias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
