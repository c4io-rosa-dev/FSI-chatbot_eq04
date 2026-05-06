import { Placeholder } from '@/components/Placeholder';
import { PROFISSIONAIS } from '@/data/acdks';

export function Profissionais() {
  return (
    <section
      id="profissionais"
      style={{
        padding: '160px var(--pad)',
        background: 'var(--ink)',
        color: 'var(--cream)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 80% 20%, rgba(181,115,58,0.1), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', position: 'relative' }}>
        <div data-reveal style={{ marginBottom: 80, maxWidth: 760 }}>
          <div className="eyebrow" style={{ marginBottom: 24, color: 'var(--copper-soft)' }}>
            III · Mestres da casa
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(56px, 7vw, 112px)', lineHeight: 0.92, fontWeight: 400 }}>
            TRÊS MESTRES.
            <br />
            <span style={{ color: 'var(--copper-soft)' }}>UM SÓ PADRÃO.</span>
          </h2>
          <p style={{ marginTop: 32, fontSize: 16, lineHeight: 1.7, color: '#B8AC92' }}>
            Toda a equipe da casa tem mais de cinco anos de experiência profissional de alto padrão, formação contínua e banco fixo. O senhor escolhe o
            profissional, e ele se encarrega de lembrar do seu "flow".
          </p>
        </div>
        <div
          data-reveal
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}
        >
          {PROFISSIONAIS.map((p, i) => (
            <article key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#0A0805', padding: 12, marginBottom: 24, position: 'relative' }}>
                <Placeholder label={`Retrato · ${p.nome}`} ratio="4/5" tone="dark"
                                    src={p.foto} alt={p.nome} />
                <div
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    width: 56,
                    height: 56,
                    border: '1px solid var(--copper-soft)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--display)',
                    fontSize: 22,
                    color: 'var(--copper-soft)',
                    background: 'rgba(21,17,13,0.6)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <h3 className="display" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '0.02em' }}>
                {p.nome}
              </h3>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                  color: 'var(--copper-soft)',
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                <span>{p.titulo}</span>
                <span style={{ width: 4, height: 4, background: 'currentColor', borderRadius: '50%' }} />
                <span>{p.anos} anos</span>
              </div>
              <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.6, color: '#A89C82' }}>{p.bio}</p>
              <div style={{ marginTop: 'auto', paddingTop: 24 }}>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#7A6F58',
                  }}
                >
                  Especialidade
                </div>
                <div className="serif-it" style={{ marginTop: 4, fontSize: 18, color: 'var(--cream)' }}>
                  {p.especialidade}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
