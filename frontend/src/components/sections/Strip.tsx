const ITEMS = [
  'Corte clássico',
  'Navalha',
  'Toalha quente',
  'Hidratação',
  'Limpeza de pele',
  'Sobrancelha',
  'Micro-pigmentação',
  'Ritual completo',
];

export function Strip() {
  const all = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--ink)',
        padding: '22px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 56,
          whiteSpace: 'nowrap',
          animation: 'marq 50s linear infinite',
          fontFamily: 'var(--display)',
          fontSize: 28,
          color: 'var(--cream)',
          letterSpacing: '0.04em',
        }}
      >
        {all.map((t, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
            {t}
            <span style={{ width: 8, height: 8, background: 'var(--copper)', transform: 'rotate(45deg)' }} />
          </span>
        ))}
      </div>
    </div>
  );
}
