interface PlaceholderProps {
  label: string;
  ratio?: string;
  tone?: 'paper' | 'dark';
  src?: string;
  alt?: string;
}

export function Placeholder({ label, ratio = '4/5', tone = 'paper', src, alt }: PlaceholderProps) {
  if (src) {
    return (
      <div style={{ aspectRatio: ratio, overflow: 'hidden' }}>
      <img src={src} alt={alt ?? label}
           style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  const isDark = tone === 'dark';
  const bg = isDark ? '#1A140C' : '#D4C5A3';
  const fg = isDark ? '#2A2014' : '#BFAE85';
  const txt = isDark ? '#7A6B52' : '#6B5A40';
  return (
    <div
      style={{
        aspectRatio: ratio,
        width: '100%',
        background: `repeating-linear-gradient(135deg, ${bg} 0 16px, ${fg} 16px 17px)`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '14px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(181,115,58,0.08), transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(61,42,26,0.05), transparent 70%)',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: txt,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}
