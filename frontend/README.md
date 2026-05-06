# ACDKS Barber — Frontend (React + TypeScript)

Site institucional da ACDKS Barber transicionado de protótipo HTML/JSX (Claude Design) para uma aplicação React + TypeScript com **react-router-dom**, dividida em páginas separadas.

## Estrutura de páginas

| Rota         | Conteúdo                                  |
| ------------ | ----------------------------------------- |
| `/`          | Hero + Strip + Sobre (chamada institucional) |
| `/sobre`     | Sobre + Profissionais (a casa e os mestres) |
| `/servicos`  | Cortes/Barbas (tabs) + Combos             |
| `/planos`    | Planos de assinatura (Cabelo/Barba/Completo) |
| `/contato`   | Endereço, horários, reservas              |

`Nav`, `Footer`, `ChatBubble` e `Chatbot` (em manutenção) ficam no layout compartilhado em todas as rotas.

## Estrutura de pastas

```
src/
├── App.tsx                     # Router + ChatProvider
├── main.tsx                    # Bootstrap React + BrowserRouter
├── styles/global.css           # Tokens (cores, fontes), utilitários, animações
├── data/acdks.ts               # CORTES, BARBAS, COMBOS, PLANOS, PROFISSIONAIS, ...
├── context/ChatContext.tsx     # Estado global do chatbot (open/fullscreen)
├── hooks/useReveal.ts          # IntersectionObserver para [data-reveal]
├── components/
│   ├── Icon.tsx                # SVGs tipados
│   ├── Placeholder.tsx         # Placeholder hachurado para imagens
│   ├── layout/
│   │   ├── Layout.tsx          # Outlet + Nav + Footer + ChatBubble + Chatbot
│   │   ├── Nav.tsx             # Header com NavLink (rotas)
│   │   ├── Footer.tsx
│   │   └── ChatBubble.tsx      # Botão flutuante "Reservar"
│   ├── sections/               # Seções compostas pelas páginas
│   │   ├── Hero.tsx
│   │   ├── Strip.tsx
│   │   ├── Sobre.tsx
│   │   ├── Servicos.tsx
│   │   ├── Profissionais.tsx
│   │   ├── Combos.tsx
│   │   ├── Planos.tsx
│   │   └── Contato.tsx
│   └── chatbot/Chatbot.tsx     # Painel flutuante (modo manutenção)
└── pages/
    ├── Home.tsx
    ├── SobrePage.tsx
    ├── ServicosPage.tsx
    ├── PlanosPage.tsx
    ├── ContatoPage.tsx
    └── NotFound.tsx
```

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run typecheck
```

## Notas

- O chatbot está intencionalmente em modo "Em manutenção" — a state machine completa está documentada em `_design_handoff/project/src/chatbot.jsx` e será reconectada quando o backend Python estiver pronto.
- O HTML standalone original está preservado em `_legacy/ACDKS Barber.html` para referência.
- Os tokens de design (paleta couro/cobre/pergaminho, fontes Bebas Neue/Inter/Playfair) ficam todos em `src/styles/global.css` como CSS custom properties.
