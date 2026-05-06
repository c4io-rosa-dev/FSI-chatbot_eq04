import { Placeholder } from '@/components/Placeholder';

const HIGHLIGHTS: Array<[string, string]> = [
  ['Feito para você', 'Você escolhe seu profissional. Ele se lembra do seu corte.'],
  ['Hora marcada', 'Sem fila, sem espera. Só você e o momento que você merece.'],
  ['Produtos premium', 'Wahl, ROVRA, Reuzel, American Crew.'],
  ['Pagamento', 'Débito, crédito, dinheiro ou Pix.'],
];

export function Sobre() {
  return (
    <section id="sobre" style={{ padding: '160px var(--pad) 120px', position: 'relative' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center' }}>
          <div data-reveal style={{ position: 'relative' }}>
            <div style={{ background: 'var(--paper-soft)', padding: 14, border: '1px solid var(--line)' }}>
              <Placeholder label="Interior · cadeira do mestre" ratio="4/5" />
            </div>
            <div
              style={{
                position: 'absolute',
                top: -28,
                right: -28,
                width: 140,
                padding: 12,
                background: 'var(--paper)',
                border: '1px solid var(--line)',
              }}
            >
              <Placeholder label="Toalha quente" ratio="1/1" />
            </div>
          </div>
          <div data-reveal>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              I · A Casa
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
              Cada cliente,
              <br />
              <span style={{ color: 'var(--copper-deep)' }}>uma cerimônia.</span>
            </h2>
            <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.7, color: 'var(--ink-mute)' }}>
              A ACDKS Barber abriu suas portas na Vila Madalena em 2014, com a missão simples de fazer com que você se torne a sua melhor versão, sem pressa, do seu jeito, com a calmaria que seu momento deve ter.
            </p>
            <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.7, color: 'var(--ink-mute)' }}>
              Trabalhamos com calma, como uma dança, um ritual que revigora.
              Atendemos por hora marcada. Somente um cliente por vez com cada profissional.
            </p>
            <div
              style={{
                marginTop: 40,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 24,
                paddingTop: 32,
                borderTop: '1px solid var(--line-soft)',
              }}
            >
              {HIGHLIGHTS.map(([t, d]) => (
                <div key={t}>
                  <div className="display" style={{ fontSize: 22, color: 'var(--ink)', letterSpacing: '0.04em' }}>
                    {t}
                  </div>
                  <p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-mute)' }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
