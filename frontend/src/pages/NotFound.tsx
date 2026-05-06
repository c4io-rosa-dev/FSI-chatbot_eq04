import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section
      style={{
        padding: '200px var(--pad) 160px',
        textAlign: 'center',
        maxWidth: 'var(--maxw)',
        margin: '0 auto',
      }}
    >
      <div
        className="eyebrow"
        style={{ justifyContent: 'center', marginBottom: 24 }}
      >
        Erro · 404
      </div>
      <h1 className="display" style={{ fontSize: 'clamp(72px, 10vw, 140px)', lineHeight: 0.9, fontWeight: 400 }}>
        ROTA NÃO ENCONTRADA
      </h1>
      <p style={{ marginTop: 24, fontSize: 16, color: 'var(--ink-mute)' }}>
        A página procurada não existe.
      </p>
      <Link to="/" className="btn btn-primary btn-arrow" style={{ marginTop: 32 }}>
        Voltar ao início
      </Link>
    </section>
  );
}
