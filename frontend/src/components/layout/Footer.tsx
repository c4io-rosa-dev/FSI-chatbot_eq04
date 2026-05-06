import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';

type LinkPair = [label: string, href: string];

const COLUMNS: Array<[title: string, links: LinkPair[]]> = [
  [
    'Navegar',
    [
      ['Serviços', '/servicos'],
      ['A Casa', '/sobre'],
      ['Planos', '/planos'],
      ['Contato', '/contato'],
    ],
  ],
  [
    'Casa',
    [
      ['Sobre', '/sobre'],
      ['Produtos', '#'],
      ['Galeria', '#'],
      ['Imprensa', '#'],
    ],
  ],
  [
    'Social',
    [
      ['@acdksbarber', '#'],
      ['Facebook', '#'],
      ['WhatsApp', '#'],
    ],
  ],
];

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: '#A89C82',
        padding: '80px var(--pad) 32px',
        borderTop: '4px solid var(--copper)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 56,
            borderBottom: '1px solid #2A2014',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: 'var(--copper)' }}>
                <Icon.Emblem size={48} />
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span className="display" style={{ fontSize: 32, color: 'var(--cream)', letterSpacing: '0.06em' }}>
                  ACDKS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    letterSpacing: '0.32em',
                    color: 'var(--copper-soft)',
                    marginTop: 4,
                  }}
                >
                  BARBER · MMXIV
                </span>
              </div>
            </div>
            <p style={{ marginTop: 24, fontSize: 13, lineHeight: 1.6, maxWidth: 320 }}>
              Tradição na navalha, desde dois mil e quatorze. Vila Madalena, São Paulo.
            </p>
            <div className="serif-it" style={{ marginTop: 20, fontSize: 16, color: 'var(--copper-soft)' }}>
              "Nec aspera terrent."
            </div>
          </div>
          {COLUMNS.map(([title, links]) => (
            <div key={title}>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--copper-soft)',
                  marginBottom: 16,
                }}
              >
                {title}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                {links.map(([l, h]) => (
                  <li key={l}>
                    {h.startsWith('/') ? (
                      <Link to={h} style={{ color: '#C4B89E' }}>
                        {l}
                      </Link>
                    ) : (
                      <a href={h} style={{ color: '#C4B89E' }}>
                        {l}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            paddingTop: 28,
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#7A6F58',
          }}
        >
          <span>© MMXXVI ACDKS Barber</span>
          <span>FSI · Projeto Acadêmico</span>
          <span>CNPJ 00.000.000/0001-00</span>
        </div>
      </div>
    </footer>
  );
}
