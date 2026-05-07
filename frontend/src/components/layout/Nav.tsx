import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { useChat } from '@/context/ChatContext';
import { login } from '@/utils/login';

const LINKS: Array<[string, string]> = [
  ['Serviços', '/servicos'],
  ['A Casa', '/sobre'],
  ['Planos', '/planos'],
  ['Contato', '/contato'],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { openChat } = useChat();

  const handleLogin = async () => {
    // const nome = prompt("Nome");
    // const senha = prompt("Senha");

    // if (!nome || !senha) {
    //   alert("Login incorreto!");
    //   return;
    // }

    // const entrar = await login(nome, senha);

    // if (entrar) {
      
    // }

    alert('oi');
  }

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(232,221,199,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
        transition: 'all .3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--maxw)',
          margin: '0 auto',
          padding: '20px var(--pad)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--copper)' }}>
            <Icon.Emblem size={32} />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span className="display" style={{ fontSize: 22, color: 'var(--ink)', letterSpacing: '0.06em' }}>
              ACDKS
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 9,
                letterSpacing: '0.32em',
                color: 'var(--ink-mute)',
                marginTop: 2,
              }}
            >
              BARBER · EST. 2014
            </span>
          </div>
        </Link>
        <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {LINKS.map(([l, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              {l}
            </NavLink>
          ))}
          <button className="btn btn-primary" onClick={openChat} style={{ padding: '11px 20px' }}>
            Agendar
          </button>
          <button className="btn btn-primary" onClick={handleLogin} style={{ padding: '11px 20px' }}>
            Entrar
          </button>
        </nav>
      </div>
    </header>
  );
}
